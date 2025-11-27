import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

// --- Triggers ---

/**
 * Trigger: When a new order is created in the root 'orders' collection.
 */
export const onOrderCreated = functions.firestore
    .document("orders/{orderId}")
    .onCreate(async (snapshot, context) => {
        const orderData = snapshot.data();
        const orderId = context.params.orderId;
        const tenantId = orderData.tenantId;

        console.log(`[Order Created] ID: ${orderId}, Tenant: ${tenantId}`);

        // 1. Send Confirmation SMS
        if (orderData.customerPhone) {
            await sendNotification(
                tenantId,
                orderData.customerId,
                orderData.customerPhone,
                `Hi ${orderData.customerName || 'there'}, thanks for your order #${orderId.slice(0, 4)}! We've received it and will update you soon.`
            );
        }

        // 2. Auto-Assign Driver (Simple Round Robin or Geo-based Mock)
        // In a real app, we'd query 'users' where role=='driver' and isOnline==true
        // For MVP, we'll just log it.
        console.log(`[Auto-Assign] Searching for drivers near ${orderData.pickupAddress?.city}...`);

        // Mock: Assign to a specific driver if available
        // await snapshot.ref.update({ driverId: "driver_123", status: "driver_assigned_pickup" });
    });

/**
 * Trigger: When an order is updated.
 */
export const onOrderUpdate = functions.firestore
    .document("orders/{orderId}")
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();
        const orderId = context.params.orderId;
        const tenantId = newData.tenantId;

        // Skip if status hasn't changed
        if (newData.status === previousData.status) return null;

        console.log(`[Order Update] ${orderId} moved to ${newData.status}`);

        // Status Change Logic
        switch (newData.status) {
            case "driver_assigned_pickup":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `A driver has been assigned to your order #${orderId.slice(0, 4)}!`);
                break;

            case "en_route_pickup":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `Your driver is on the way for pickup!`);
                break;

            case "processing":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `Your laundry is now being processed at our facility.`);
                // Log start time
                await change.after.ref.update({
                    "timings.processingStarted": admin.firestore.FieldValue.serverTimestamp(),
                });
                break;

            case "ready_for_delivery":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `Your laundry is clean and ready for delivery!`);
                break;

            case "en_route_delivery":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `Your fresh laundry is on the way back to you!`);
                break;

            case "delivered":
                await sendNotification(tenantId, newData.customerId, newData.customerPhone,
                    `Delivered! Enjoy your fresh laundry. Thanks for using Laundry Hive.`);

                // Trigger Payment Capture
                if (newData.paymentStatus === "pending") {
                    console.log(`[Payment] Capturing payment for order ${orderId}...`);
                    // await capturePayment(orderId);
                }
                break;
        }

        return null;
    });

// --- Helpers ---

async function sendNotification(tenantId: string, userId: string, phone: string | undefined, message: string) {
    if (!phone) {
        console.log(`[Notification Skipped] No phone number for user ${userId}`);
        return;
    }

    // In a real app, use Twilio / SNS / FCM
    console.log(`[SMS] To ${phone} (${userId}): "${message}"`);

    // Log usage
    try {
        await db.collection("usage_logs").add({
            tenantId,
            type: "sms",
            cost: 0.05,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            metadata: { userId, message }
        });
    } catch (err) {
        console.error("Failed to log usage:", err);
    }
}
