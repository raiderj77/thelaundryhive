import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

const db = admin.firestore();

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
    let event: Stripe.Event;

    try {
        // In a real scenario, we verify the signature
        // const sig = req.headers['stripe-signature'];
        // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock';
        // event = stripe.webhooks.constructEvent(req.rawBody, sig as string, endpointSecret);
        event = req.body; // Trusting body for dev/mock
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    try {
        switch (event.type) {
            case 'account.updated': {
                const account = event.data.object as Stripe.Account;
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
                const session = event.data.object as Stripe.Checkout.Session;
                const orderId = session.metadata?.orderId;
                const tenantId = session.metadata?.tenantId;

                if (orderId && tenantId) {
                    await db.collection('orders').doc(orderId)
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
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});
