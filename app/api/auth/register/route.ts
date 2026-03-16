import { NextRequest, NextResponse } from 'next/server';

// Mock user database - in production, use a real database
let users = [
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
        const { email, password, name, phone, address, city, state, zipCode, country } = await request.json();

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            email,
            password, // In production, hash this password
            name,
            phone,
            address,
            city,
            state,
            zipCode,
            country
        };

        users.push(newUser);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            success: true,
            data: userWithoutPassword
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
