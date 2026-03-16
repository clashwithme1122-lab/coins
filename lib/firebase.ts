// Firebase Configuration
// Place your Google JSON file in the root directory and name it 'serviceAccountKey.json'
// Then import it here

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAulTxCpDy6_vjjSVfH7M1bVeaaoc1IJqs",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "taksi-275d2.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "taksi-275d2",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "taksi-275d2.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "751437476856",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:751437476856:web:c16c29782e20035e56dc0d",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0X73DJC39Z"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Analytics only on client side
let analyticsInstance: any = null

export const getAnalyticsInstance = () => {
    if (typeof window !== 'undefined' && !analyticsInstance) {
        isSupported().then((supported) => {
            if (supported) {
                analyticsInstance = getAnalytics(app)
            }
        })
    }
    return analyticsInstance
}

export const analytics = getAnalyticsInstance()

export default app
