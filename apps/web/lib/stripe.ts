import Stripe from 'stripe';

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null;

export const getStripe = (): Stripe => {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is missing. Please set it in your .env.local file.');
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16', // Use a pinned version for stability
            typescript: true,
        });
    }
    return stripeInstance;
};

// For backward compatibility - will only throw when accessed at runtime
export const stripe = {
    get accounts() { return getStripe().accounts; },
    get accountLinks() { return getStripe().accountLinks; },
    get customers() { return getStripe().customers; },
    get paymentIntents() { return getStripe().paymentIntents; },
    get checkout() { return getStripe().checkout; },
    get webhooks() { return getStripe().webhooks; },
};
