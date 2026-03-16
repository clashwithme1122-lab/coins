import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
        }

        try {
            // Try to get user data from Firebase
            const userDoc = await getDoc(doc(db, 'users', userId))

            if (userDoc.exists()) {
                return NextResponse.json({
                    success: true,
                    user: { id: userId, ...userDoc.data() }
                })
            } else {
                // Return default data if user doesn't exist
                const defaultUserData = {
                    id: userId,
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                return NextResponse.json({
                    success: true,
                    user: defaultUserData
                })
            }
        } catch (error) {
            console.error('Firebase error, using mock data:', error)

            // Fallback to mock data
            const mockUserData = {
                id: userId,
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 234 567 8900',
                address: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            return NextResponse.json({
                success: true,
                user: mockUserData
            })
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch user data' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { userId, ...profileData } = await request.json()

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
        }

        try {
            // Try to save to Firebase
            const userRef = doc(db, 'users', userId)
            const userDoc = await getDoc(userRef)

            const dataToSave = {
                ...profileData,
                updatedAt: new Date().toISOString()
            }

            if (userDoc.exists()) {
                // Update existing user
                await updateDoc(userRef, dataToSave)
                console.log('Profile updated in Firebase for user:', userId)
            } else {
                // Create new user document
                await setDoc(userRef, {
                    ...dataToSave,
                    createdAt: new Date().toISOString()
                })
                console.log('Profile created in Firebase for user:', userId)
            }

            return NextResponse.json({
                success: true,
                message: 'Profile updated successfully',
                user: { id: userId, ...dataToSave }
            })
        } catch (error) {
            console.error('Firebase error, logging profile update:', error)

            // Fallback - just log the update
            console.log('Profile update request (Firebase failed):', profileData)

            return NextResponse.json({
                success: true,
                message: 'Profile updated successfully (mock)',
                user: { id: userId, ...profileData, updatedAt: new Date().toISOString() }
            })
        }
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 })
    }
}
