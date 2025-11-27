
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as fs from 'fs';
import * as path from 'path';

// Manually load .env.local
const envPath = 'c:\\Users\\jason\\Desktop\\laundry-hive\\.env.local';
console.log(`Loading env from: ${envPath}`);

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} else {
    console.error(".env.local file not found!");
    process.exit(1);
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("\n============================================");
console.log("FIREBASE PROJECT ID: ", firebaseConfig.projectId);
console.log("============================================\n");

console.log("Firebase Config:", {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? '***' : undefined
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
    console.log("Attempting to write to Firestore...");
    try {
        const docRef = await addDoc(collection(db, "_test_connection"), {
            timestamp: new Date(),
            test: "connection_verification"
        });
        console.log("Document written with ID: ", docRef.id);
        console.log("SUCCESS: Firebase connection is working!");
    } catch (e) {
        console.error("Error adding document: ", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
        console.error("FAILURE: Could not connect to Firebase.");
    }
}

testConnection();
