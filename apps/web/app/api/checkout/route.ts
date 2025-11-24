import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
    : null;

export async function POST(request: Request) {
    try {
        if (!stripe) {
            return NextResponse.json({ error: "Payment processing not configured" }, { status: 503 });
        }

        const { amount, customerEmail, orderId } = await request.json();

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Laundry Service",
                            description: `Order #${orderId}`,
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${request.headers.get("origin")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get("origin")}/payment/cancel`,
            customer_email: customerEmail,
            metadata: {
                orderId: orderId,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
