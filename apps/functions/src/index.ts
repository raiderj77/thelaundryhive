import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

// Export function groups
export * from "./orders";
export * from "./billing";
export * from './webhooks';
