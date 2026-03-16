# Firebase Setup Instructions

## Current Status
The application is currently running with **development mode Firebase configuration**. All features are functional but using client-side Firebase SDK.

## For Production Deployment

### 1. Install Firebase Admin SDK
```bash
npm install firebase-admin
```

### 2. Get Service Account Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file and rename it to `serviceAccountKey.json`
4. Place it in the root directory of your project

### 3. Update Environment Variables (for Vercel/Production)
Add these to your environment variables:
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_CLIENT_EMAIL`: Service account email
- `FIREBASE_PRIVATE_KEY`: Service account private key (replace \n with actual newlines)

### 4. Replace Development Files
Replace the contents of `lib/firebase-admin.ts` with the production version:

```typescript
import admin from 'firebase-admin';
import { getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

export const adminDb = getFirestore();
export const adminAuth = admin.auth();
export default admin;
```

### 5. Update Middleware
Replace `middleware.ts` with proper token verification:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      await adminAuth.verifyIdToken(token);
    } catch (error) {
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
```

## Current Features Working
✅ Dashboard route protection (basic)
✅ Profile editing functionality
✅ Chat system (client-side)
✅ Enhanced UI/UX components
✅ Trust signals and credibility features
✅ Enhanced product pages

## Security Notes
- Development mode uses basic token validation
- Production mode requires Firebase Admin SDK for proper security
- Always use environment variables for sensitive credentials
- Never commit service account keys to version control
