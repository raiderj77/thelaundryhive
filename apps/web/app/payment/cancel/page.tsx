"use client";
import React from "react";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="text-red-600" size={40} />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Cancelled</h1>
                <p className="text-slate-500 mb-8">
                    No worries! You haven't been charged. You can try again whenever you're ready.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/sparkle-wash"
                        className="block w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} /> Return to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}
