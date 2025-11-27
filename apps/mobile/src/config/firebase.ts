import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Config from .env.local
const firebaseConfig = {
    apiKey: "AIzaSyDECDcHjdpEAuO-JYLj90jlv3NoTicaQg4",
    authDomain: "the-laundry-hive.firebaseapp.com",
    projectId: "the-laundry-hive",
    storageBucket: "the-laundry-hive.firebasestorage.app",
    messagingSenderId: "431180035316",
    appId: "1:431180035316:web:9105745748857c3adb1aa1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
