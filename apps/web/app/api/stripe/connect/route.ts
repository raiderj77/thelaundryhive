import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase/config'; // Ensure this is server-safe or use admin SDK if needed
// Note: Client SDK 'db' works in Next.js API routes usually, but Admin SDK is better for security.
// For MVP speed, we'll use the existing config, but in prod we should use Admin SDK.

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tenantId } = body;

        if (!tenantId) {
            return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 });
        }

        // 1. Create a Stripe Connect Account (Express)
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'US', // Default to US for MVP
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            settings: {
                payouts: {
                    schedule: {
                        interval: 'manual', // Or daily
                    },
                },
            },
        });

        // 2. Create an Account Link for onboarding
        const origin = req.headers.get('origin') || 'http://localhost:3000';
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${origin}/dashboard/settings?stripe_refresh=true`,
            return_url: `${origin}/api/stripe/callback?account_id=${account.id}&tenant_id=${tenantId}`,
            type: 'account_onboarding',
        });

        return NextResponse.json({ url: accountLink.url });
    } catch (error: any) {
        console.error('Stripe Connect Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
