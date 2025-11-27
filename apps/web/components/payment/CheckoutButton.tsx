"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface CheckoutButtonProps {
    amount: number;
    orderId: string;
    customerEmail: string;
}

export default function CheckoutButton({ amount, orderId, customerEmail }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const { light, error } = useHaptic();

    const handleCheckout = async () => {
        light();
        setLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, orderId, customerEmail }),
            });

            const { url } = await response.json();

            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            error();
            console.error("Checkout error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className="flex items-center gap-2 bg-hive-primary text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
            <CreditCard size={20} />
            {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </button>
    );
}
