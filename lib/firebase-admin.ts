// Development fallback - using client-side Firebase only
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Mock admin functions for development using client Firebase
export const adminAuth = {
    verifyIdToken: async (token: string) => {
        try {
            // For development, just validate token format
            if (token && token.length > 10) {
                // Extract user ID from token (simplified)
                const userId = token.split('.')[0];
                return { uid: userId };
            }
            throw new Error('Invalid token');
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
};

export const adminDb = {
    collection: (name: string) => ({
        doc: (id: string) => ({
            get: async () => {
                const docRef = doc(db, name, id);
                const docSnap = await getDoc(docRef);
                return {
                    exists: docSnap.exists(),
                    data: () => docSnap.data()
                };
            },
            set: async (data: any, options?: any) => {
                const docRef = doc(db, name, id);
                if (options?.merge) {
                    await updateDoc(docRef, data);
                } else {
                    await setDoc(docRef, data);
                }
            },
            update: async (data: any) => {
                const docRef = doc(db, name, id);
                await updateDoc(docRef, data);
            }
        })
    })
};

export default {
    auth: adminAuth,
    db: adminDb
};
