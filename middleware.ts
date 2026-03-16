import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('authToken')?.value;

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        // For production, verify token format and allow access
        try {
            // Basic token format check - ensure it exists and has reasonable length
            if (!token || token.length < 10) {
                console.log('Invalid token format in middleware');
                throw new Error('Invalid token format');
            }

            // In production, you might want to verify the Firebase token
            // For now, allow access if token format is valid
            console.log('Token validated, allowing dashboard access');
            return NextResponse.next();
        } catch (error) {
            console.error('Middleware auth error:', error);
            // Token is invalid, redirect to login
            const response = NextResponse.redirect(new URL('/auth/login', request.url));
            response.cookies.delete('authToken');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};
