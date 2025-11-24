import * as admin from "firebase-admin";

admin.initializeApp();

// Export function groups
export * from "./orders";
export * from "./billing";
export * from './webhooks';
