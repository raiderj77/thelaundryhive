import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get('account_id');
    const tenantId = searchParams.get('tenant_id');

    if (!accountId || !tenantId) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        // 1. Verify the account status with Stripe
        const account = await stripe.accounts.retrieve(accountId);

        // 2. Check if charges are enabled (onboarding complete)
        const chargesEnabled = account.charges_enabled;

        // 3. Update Firestore Tenant
        const tenantRef = doc(db, 'tenants', tenantId);
        await updateDoc(tenantRef, {
            stripeAccountId: accountId,
            stripeChargesEnabled: chargesEnabled,
            updatedAt: Timestamp.now()
        });

        // 4. Redirect back to settings with success flag
        const origin = new URL(req.url).origin;
        return NextResponse.redirect(`${origin}/dashboard/settings?stripe_connected=true`);

    } catch (error: any) {
        console.error('Stripe Callback Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
