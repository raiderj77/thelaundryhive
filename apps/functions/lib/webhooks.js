"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe_1 = require("stripe");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2023-10-16',
});
const db = admin.firestore();
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    var _a, _b;
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock';
    let event;
    try {
        // In a real scenario, we verify the signature
        // event = stripe.webhooks.constructEvent(req.rawBody, sig as string, endpointSecret);
        event = req.body; // Trusting body for dev/mock
    }
    catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    try {
        switch (event.type) {
            case 'account.updated': {
                const account = event.data.object;
                if (account.payouts_enabled) {
                    // Find tenant by stripeAccountId and update
                    const tenantsSnapshot = await db.collection('tenants')
                        .where('stripeAccountId', '==', account.id)
                        .limit(1)
                        .get();
                    if (!tenantsSnapshot.empty) {
                        await tenantsSnapshot.docs[0].ref.update({
                            stripeConnected: true,
                            payoutsEnabled: true
                        });
                        console.log(`Tenant ${tenantsSnapshot.docs[0].id} payouts enabled.`);
                    }
                }
                break;
            }
            case 'checkout.session.completed': {
                const session = event.data.object;
                const orderId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.orderId;
                const tenantId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.tenantId;
                if (orderId && tenantId) {
                    await db.collection('tenants').doc(tenantId)
                        .collection('orders').doc(orderId)
                        .update({
                        paymentStatus: 'paid',
                        stripeSessionId: session.id
                    });
                    console.log(`Order ${orderId} marked as paid.`);
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});
//# sourceMappingURL=webhooks.js.map