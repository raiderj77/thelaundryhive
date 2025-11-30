import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, type Firestore, getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
    type User,
    type Auth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Lazy initialization for build-time safety
let _app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;

function getApp(): FirebaseApp {
    if (!_app) {
        _app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
        console.log("[FIREBASE CONFIG] Initializing with Project ID:", firebaseConfig.projectId);
        console.log("[FIREBASE CONFIG] API Key present:", !!firebaseConfig.apiKey);
    }
    return _app;
}

// Export getters for lazy initialization
export const db = new Proxy({} as Firestore, {
    get(_, prop) {
        if (!_db) {
            try {
                _db = initializeFirestore(getApp(), {
                    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
                });
            } catch {
                // Fall back to basic initialization if persistent cache fails (e.g., during SSR)
                _db = getFirestore(getApp());
            }
        }
        return (_db as any)[prop];
    }
});

export const auth = new Proxy({} as Auth, {
    get(_, prop) {
        if (!_auth) {
            _auth = getAuth(getApp());
        }
        return (_auth as any)[prop];
    }
});

// Re-export auth functions for use in components
export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
    type User,
    type Auth
};