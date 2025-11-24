"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShow(true);
        }
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setShow(false);
    };

    const decline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-lg border-t border-slate-700 animate-in slide-in-from-bottom-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-300">
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                    <Link href="/legal/privacy" className="text-hive-primary hover:underline ml-1">Learn more</Link>
                </div>
                <div className="flex gap-3">
                    <button onClick={decline} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Decline
                    </button>
                    <button onClick={accept} className="px-6 py-2 text-sm font-bold bg-hive-primary text-slate-900 rounded-lg hover:brightness-110 transition-all">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
