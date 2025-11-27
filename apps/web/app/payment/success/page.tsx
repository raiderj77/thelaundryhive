"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useHaptic } from "@/hooks/use-haptic";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { success } = useHaptic();

    useEffect(() => {
        success();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h1>
                <p className="text-slate-500 mb-8">
                    Your order has been confirmed. We've sent a receipt to your email.
                </p>

                {sessionId && (
                    <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-400 mb-8 font-mono break-all">
                        Session ID: {sessionId.slice(0, 20)}...
                    </div>
                )}

                <div className="space-y-3">
                    <Link
                        href="/dashboard/kanban"
                        className="block w-full bg-hive-primary text-white py-3 rounded-xl font-bold hover:brightness-110 transition shadow-lg shadow-hive-primary/20 flex items-center justify-center gap-2"
                    >
                        Go to Dashboard <ArrowRight size={18} />
                    </Link>

                    <Link
                        href="/"
                        className="block w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
                    >
                        <Home size={18} /> Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
