'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase-production'

interface User {
  uid: string
  email: string
  displayName?: string
  name?: string
  phoneNumber?: string
  metadata?: {
    creationTime?: string
    lastSignInTime?: string
  }
  createdAt?: any
  lastLogin?: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        const userData = userDoc.data()
        
        const userObj: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          name: userData?.name || firebaseUser.displayName || '',
          phoneNumber: firebaseUser.phoneNumber || undefined,
          metadata: firebaseUser.metadata,
          createdAt: userData?.createdAt,
          lastLogin: serverTimestamp()
        }

        // Update last login
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...userData,
          lastLogin: serverTimestamp()
        }, { merge: true })

        setUser(userObj)
        
        // Also store in localStorage for components that still use it
        localStorage.setItem('user', JSON.stringify(userObj))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate inputs
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' }
      }

      console.log('Attempting login for:', email)
      console.log('Firebase config check:', {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Not set',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'
      })
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful for user:', userCredential.user.uid)
      
      // Store auth token for middleware with proper production settings
      const token = await userCredential.user.getIdToken()
      const isProduction = process.env.NODE_ENV === 'production'
      document.cookie = `authToken=${token}; path=/; max-age=3600; secure=${isProduction}; samesite=strict`
      
      return { success: true }
    } catch (error: any) {
      console.error('Login error:', error.code, error.message)
      
      let errorMessage = 'Login failed'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection'
      } else if (error.code === 'auth/internal-error') {
        errorMessage = 'Internal error. Please try again'
      } else if (error.code === 'auth/api-key-not-authorized') {
        errorMessage = 'Firebase configuration error. Please contact support.'
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = 'Invalid Firebase configuration. Please check API key.'
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'Service temporarily unavailable. Please try again later.'
      }

      return { success: false, error: errorMessage }
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate inputs
      if (!email || !password || !name) {
        return { success: false, error: 'All fields are required' }
      }

      if (password.length < 6) {
        return { success: false, error: 'Password should be at least 6 characters' }
      }

      console.log('Attempting signup for:', email)
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update display name
      await updateProfile(userCredential.user, { displayName: name })
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        name: name,
        displayName: name,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        role: 'user'
      })

      console.log('Signup successful for user:', userCredential.user.uid)
      return { success: true }
    } catch (error: any) {
      console.error('Signup error:', error.code, error.message)
      
      let errorMessage = 'Signup failed'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection'
      } else if (error.code === 'auth/internal-error') {
        errorMessage = 'Internal error. Please try again'
      }
      return { success: false, error: errorMessage }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
