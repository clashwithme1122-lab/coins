'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  timestamp: any;
  userName: string;
  read: boolean;
}

export default function DashboardChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadMessages();
      // Set up real-time updates
      const interval = setInterval(() => {
        loadMessages();
      }, 3000); // Check for new messages every 3 seconds

      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Try Firebase first
      try {
        const response = await fetch(`/api/admin-chat?userId=${user.uid}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMessages(data.messages);
            // Also save to localStorage for backup
            localStorage.setItem(`chat_${user.uid}`, JSON.stringify(data.messages));
            console.log('Messages loaded from Firebase:', data.messages.length);
            return;
          }
        }
      } catch (error) {
        console.log('Firebase not available, using localStorage fallback');
      }

      // Fallback to localStorage only if Firebase fails
      const storedMessages = localStorage.getItem(`chat_${user.uid}`);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
        console.log('Messages loaded from localStorage:', parsedMessages.length);
      } else {
        // Add welcome message only if no messages exist
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          message: 'Welcome to Taksila Coins Support! How can we help you today?',
          sender: 'admin',
          timestamp: new Date(),
          userName: 'Admin Support',
          read: true
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(`chat_${user.uid}`, JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || sending) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      timestamp: new Date(),
      userName: user.displayName || user.email || 'User',
      read: false
    };

    setSending(true);
    try {
      // Try Firebase first
      try {
        const response = await fetch('/api/admin-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage,
            userId: user.uid,
            userName: user.displayName || user.email || 'User',
            sender: 'user'
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Message sent to Firebase:', data);
          // Reload messages to get the latest from Firebase
          await loadMessages();
          setNewMessage('');
          return; // Success, don't use fallback
        }
      } catch (error) {
        console.log('Firebase not available, using localStorage fallback');
      }

      // Fallback to localStorage only if Firebase fails
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(`chat_${user.uid}`, JSON.stringify(updatedMessages));
      
      // Simulate admin response after 2 seconds
      setTimeout(() => {
        const adminReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: `Thanks for your message: "${newMessage}". An admin will respond shortly!`,
          sender: 'admin',
          timestamp: new Date(),
          userName: 'Admin Support',
          read: true
        };
        
        const messagesWithReply = [...updatedMessages, adminReply];
        setMessages(messagesWithReply);
        localStorage.setItem(`chat_${user.uid}`, JSON.stringify(messagesWithReply));
      }, 2000);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">Admin Support Chat</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No messages yet. Start a conversation with our admin support team.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.sender === 'user' ? 'You' : 'Admin'} • {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
