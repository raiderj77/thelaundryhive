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

// HARDCODED Firebase config to bypass environment variable loading issues
// TODO: Move back to environment variables once authentication is working
const firebaseConfig = {
    apiKey: "AIzaSyDECDcHjdpEAuO-JYLj90jlv3NoTicaQg4",
    authDomain: "the-laundry-hive.firebaseapp.com",
    projectId: "the-laundry-hive",
    storageBucket: "the-laundry-hive.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Get from Firebase Console → Project Settings
    appId: "YOUR_APP_ID"  // Get from Firebase Console → Project Settings
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