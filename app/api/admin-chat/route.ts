import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore"

// Mock storage for development fallback
const mockMessages: any[] = [];
const mockSessions: any[] = [];

// Default admin user
const DEFAULT_ADMIN = {
    id: 'admin',
    email: 'admin@taksila.com',
    name: 'Admin User',
    role: 'admin'
};

export async function POST(request: NextRequest) {
    let body = null;
    try {
        body = await request.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { message, userId, userName, sender = 'user', adminId = 'admin' } = body;

    if (!message || !userId) {
        return NextResponse.json({ error: "Message and userId are required" }, { status: 400 });
    }


    try {
        // Create message with proper timestamp
        const chatMessage = {
            userId,
            userName,
            message,
            sender,
            adminId: sender === 'admin' ? adminId : null,
            timestamp: new Date().toISOString(),
            read: sender === 'admin'
        };

        // Add to messages collection
        const messagesRef = collection(db, "chatMessages");
        const docRef = await addDoc(messagesRef, chatMessage);
        console.log('Message added to Firebase with ID:', docRef.id);

        // Update or create chat session
        const chatsRef = collection(db, "chatSessions");
        const chatQuery = query(chatsRef, where("userId", "==", userId));
        const chatSnapshot = await getDocs(chatQuery);

        if (chatSnapshot.empty) {
            // Create new chat session
            const sessionData = {
                userId,
                userName,
                lastMessage: message,
                lastMessageTime: new Date().toISOString(),
                unreadCount: sender === 'user' ? 1 : 0,
                status: 'active',
                createdAt: new Date().toISOString(),
                lastSender: sender
            };
            const sessionRef = await addDoc(chatsRef, sessionData);
            console.log('Chat session created with ID:', sessionRef.id);
        } else {
            // Update existing chat session
            const chatDoc = chatSnapshot.docs[0];
            const chatRef = doc(db, "chatSessions", chatDoc.id);
            const currentData = chatDoc.data();

            const updateData = {
                lastMessage: message,
                lastMessageTime: new Date().toISOString(),
                unreadCount: sender === 'user'
                    ? (currentData.unreadCount || 0) + 1
                    : 0,
                status: 'active',
                lastSender: sender
            };

            await updateDoc(chatRef, updateData);
            console.log('Chat session updated for user:', userId);
        }

        console.log('Message saved to Firebase successfully');
        return NextResponse.json({ success: true, message: "Message sent successfully", messageId: docRef.id });
    } catch (error) {
        console.error("Firebase failed, using mock storage:", error);

        // Fallback to mock storage
        const mockMessage = {
            id: Date.now().toString(),
            userId,
            userName,
            message,
            sender,
            adminId: sender === 'admin' ? adminId : null,
            timestamp: new Date().toISOString(),
            read: sender === 'admin'
        };

        mockMessages.push(mockMessage);

        // Update or create mock session
        const existingSession = mockSessions.find(s => s.userId === userId);
        if (existingSession) {
            existingSession.lastMessage = message;
            existingSession.lastMessageTime = new Date().toISOString();
            existingSession.unreadCount = sender === 'user' ? (existingSession.unreadCount || 0) + 1 : 0;
            existingSession.lastSender = sender;
        } else {
            mockSessions.push({
                id: userId,
                userId,
                userName,
                lastMessage: message,
                lastMessageTime: new Date().toISOString(),
                unreadCount: sender === 'user' ? 1 : 0,
                status: 'active',
                createdAt: new Date().toISOString(),
                lastSender: sender
            });
        }

        console.log('Message saved to mock storage:', mockMessage);
        return NextResponse.json({ success: true, message: "Message sent successfully (mock)" });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const adminId = searchParams.get('adminId');

        if (!userId && !adminId) {
            return NextResponse.json({ error: "userId or adminId is required" }, { status: 400 });
        }

        // Try Firebase first - NO INDEXES NEEDED
        let messagesQuery;
        if (userId) {
            // Simple query without ordering to avoid index requirement
            messagesQuery = query(
                collection(db, "chatMessages"),
                where("userId", "==", userId)
            );
        } else {
            // Admin gets all messages (no filter, no order)
            messagesQuery = query(collection(db, "chatMessages"));
        }

        const messagesSnapshot = await getDocs(messagesQuery);
        let messages = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as any)
        }));

        // Sort client-side instead of server-side to avoid index
        if (userId) {
            messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        } else {
            messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }

        console.log(`Loaded ${messages.length} messages from Firebase`);
        return NextResponse.json({ success: true, messages });
    } catch (error) {
        console.error("Firebase failed, using mock storage:", error);

        // Fallback to mock storage
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        let messages = mockMessages;
        if (userId) {
            messages = mockMessages.filter(m => m.userId === userId).sort((a, b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        } else {
            messages = mockMessages.sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
        }

        console.log(`Loaded ${messages.length} messages from mock storage`);
        return NextResponse.json({ success: true, messages });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { messageId, read } = await request.json();

        if (!messageId) {
            return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
        }


        // Try Firebase first
        const messageRef = doc(db, "chatMessages", messageId);
        await updateDoc(messageRef, { read: read !== false });

        console.log('Message updated in Firebase:', messageId);
        return NextResponse.json({ success: true, message: "Message updated successfully" });
    } catch (error) {
        console.error("Firebase failed for PUT, using mock storage:", error);

        // Fallback to mock storage
        const { messageId, read } = await request.json();
        const message = mockMessages.find(m => m.id === messageId);
        if (message) {
            message.read = read !== false;
        }

        return NextResponse.json({ success: true, message: "Message updated successfully (mock)" });
    }
}
