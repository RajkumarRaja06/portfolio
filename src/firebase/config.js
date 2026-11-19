import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Linked Firebase credentials for project "my-portfolio-6e398"
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBcmo_ruT0ROMSg-hp34gWtnjwVpGSGb-k",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "my-portfolio-6e398.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "my-portfolio-6e398",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "my-portfolio-6e398.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "712511700791",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:712511700791:web:05a5aafd116ed4c75364b2",
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Export Cloud Firestore Database
export const db = getFirestore(app);

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
};

export default app;
