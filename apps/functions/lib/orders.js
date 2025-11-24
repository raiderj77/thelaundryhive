"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onOrderUpdate = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
// Order State Machine
// Trigger: When an order document is updated
exports.onOrderUpdate = functions.firestore
    .document("tenants/{tenantId}/orders/{orderId}")
    .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    // Status changed?
    if (newData.status === previousData.status)
        return null;
    const { tenantId, orderId } = context.params;
    const newStatus = newData.status;
    console.log(`Order ${orderId} (Tenant: ${tenantId}) moved to ${newStatus}`);
    // State Machine Logic
    switch (newStatus) {
        case "at_lab":
            // Notify Customer: "We have your clothes!"
            await sendNotification(tenantId, newData.customerId, "Your laundry has arrived at the Hive!");
            break;
        case "washing":
            // Log start time for efficiency tracking
            await change.after.ref.update({
                "timings.washStarted": admin.firestore.FieldValue.serverTimestamp(),
            });
            break;
        case "out_for_delivery":
            // Notify Customer: "Driver is on the way!"
            await sendNotification(tenantId, newData.customerId, "Your fresh laundry is on the way back!");
            break;
        case "completed":
            // Trigger Payment Capture if not already paid
            if (newData.paymentStatus === "pending") {
                // TODO: Call Stripe Capture
                console.log("Attempting to capture payment for order", orderId);
            }
            break;
    }
    return null;
});
async function sendNotification(tenantId, userId, message) {
    // In a real app, look up user's phone/FCM token and send via Twilio/FCM
    console.log(`[Notification] To User ${userId}: ${message}`);
    // Log usage for billing
    await db.collection("usage_logs").add({
        tenantId,
        type: "sms",
        cost: 0.05,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
}
//# sourceMappingURL=orders.js.map