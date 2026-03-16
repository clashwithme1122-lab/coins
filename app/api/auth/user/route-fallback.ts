import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
        }

        // For development, return mock data
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
        };

        return NextResponse.json({
            success: true,
            user: mockUserData
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch user data' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { userId, ...profileData } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
        }

        // For development, just return success
        console.log('Profile update request:', profileData);

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: userId,
                ...profileData,
                updatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
    }
}
