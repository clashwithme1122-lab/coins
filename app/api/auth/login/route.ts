import { NextRequest, NextResponse } from 'next/server';

// Mock user database - in production, use a real database
const users = [
    {
        id: 1,
        email: 'user@example.com',
        password: 'password123', // In production, use hashed passwords
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
    }
];

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Find user by email
        const user = users.find(u => u.email === email);

        if (!user || user.password !== password) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            data: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
