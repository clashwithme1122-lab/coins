// Production Firebase Configuration with enhanced error handling
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Production Firebase configuration with fallback values
const firebaseConfig: { [key: string]: string | undefined } = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAulTxCpDy6_vjjSVfH7M1bVeaaoc1IJqs",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "taksi-275d2.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "taksi-275d2",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "taksi-275d2.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "751437476856",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:751437476856:web:c16c29782e20035e56dc0d",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0X73DJC39Z"
}

// Validate required config
const validateConfig = () => {
    const required = ['apiKey', 'authDomain', 'projectId', 'appId']
    const missing = required.filter(key => !firebaseConfig[key])

    if (missing.length > 0) {
        console.error('Missing Firebase config:', missing)
        throw new Error(`Missing Firebase configuration: ${missing.join(', ')}`)
    }
}

// Initialize Firebase with error handling
let app
try {
    validateConfig()
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    console.log('Firebase initialized successfully')
} catch (error) {
    console.error('Firebase initialization error:', error)
    throw error
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Set auth persistence for production
auth.settings.appVerificationDisabledForTesting = false

// Analytics only on client side
export const analytics = typeof window !== 'undefined'
    ? isSupported().then((yes) => yes ? getAnalytics(app) : null)
    : Promise.resolve(null)

export default app
