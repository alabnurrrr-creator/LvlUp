# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to firebase.google.com
2. Click "Go to console"
3. Create new project: `lvlup`
4. Skip Analytics for now

## Step 2: Authentication

1. Go to **Authentication**
2. Enable **Email/Password**
3. Enable **Google** (optional)
4. Add your domain

## Step 3: Firestore Database

1. Go to **Firestore Database**
2. Create database in **Test Mode**
3. Choose nearest location

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    match /leaderboard/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 4: Get Credentials

1. Click gear icon → **Project settings**
2. Go to **Your apps** → Web
3. Copy the config object

## Step 5: Environment Variables

Create `web/.env.local`:
```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=lvlup-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=lvlup-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=lvlup-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=1:xxx:web:xxx
```

## Step 6: Test

1. Create a test user in Firebase
2. Login with that account
3. Check Firestore for saved data
