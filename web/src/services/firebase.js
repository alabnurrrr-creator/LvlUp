// Firebase Configuration
export const initializeFirebase = async () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemo",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "lvlup-demo.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "lvlup-demo",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "lvlup-demo.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abc123",
  };
  return firebaseConfig;
};

export const firebase = {
  ready: false,
  user: null,
};