# Login Issues - Debugging Guide

## Common Login Problems & Solutions

### 1. **Firebase Configuration Issues**
The most likely issue is incorrect Firebase configuration.

**Check your Firebase project settings:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `taksi-275d2`
3. Go to Project Settings → General
4. Copy the correct values for:
   - **Web API Key**
   - **Auth Domain** 
   - **Project ID**
   - **App ID**

### 2. **Environment Variables Setup**
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. **Firebase Authentication Settings**
Ensure Authentication is enabled:
1. Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** provider
3. Check your domain is in the authorized domains list

### 4. **Browser Console Debugging**
Open browser dev tools (F12) and check:
- **Console tab** for Firebase errors
- **Network tab** for failed requests
- Look for error messages like:
  - "auth/invalid-api-key"
  - "auth/project-not-found"
  - "auth/invalid-credential"

### 5. **Common Error Codes**
- `auth/user-not-found` → Email doesn't exist
- `auth/wrong-password` → Incorrect password
- `auth/invalid-email` → Invalid email format
- `auth/too-many-requests` → Too many failed attempts
- `auth/network-request-failed` → Network connection issue

### 6. **Quick Test**
Try creating a new test user:
1. Go to `/auth/login`
2. Click "Join Taksila" (signup)
3. Use a simple email/password
4. Check if signup works, then try login

### 7. **Firebase Rules Check**
Ensure your Firestore rules allow user creation:
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## Debugging Steps
1. **Check browser console** for Firebase errors
2. **Verify Firebase project** exists and is active
3. **Test with different browser** (incognito mode)
4. **Clear browser cache** and cookies
5. **Check network connection** and firewall settings

## If Still Not Working
1. Share the exact error message from browser console
2. Check if Firebase project is in production or test mode
3. Verify email/password combination is correct
4. Try resetting password if using existing account
