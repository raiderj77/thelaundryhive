"use client";
import React from "react";
import Link from "next/link";
import { Hexagon, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-hive-dark text-hive-light font-sans">
            <nav className="relative z-20 max-w-7xl mx-auto w-full p-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Hexagon className="text-hive-primary fill-hive-primary" size={32} />
                    <span className="text-2xl font-extrabold tracking-tight text-white">The<span className="text-hive-primary">Laundry</span>Hive</span>
                </Link>
                <Link href="/" className="text-sm font-semibold text-slate-200 hover:text-hive-primary transition-colors">Back to Home</Link>
            </nav>

            <div className="max-w-3xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-black text-white mb-8">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">How does the 0% commission work?</h3>
                        <p className="text-slate-300">Unlike delivery apps that take 30% of your ticket size, we charge a flat monthly software fee. You keep 100% of the revenue from your laundry orders.</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Do I need special hardware?</h3>
                        <p className="text-slate-300">No! The Laundry Hive runs on any device with a web browser—laptops, tablets, or smartphones. You can use your existing equipment.</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Is there a setup fee?</h3>
                        <p className="text-slate-300">No setup fees. You can start your free trial immediately and cancel anytime.</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">How do customers pay?</h3>
                        <p className="text-slate-300">We integrate directly with Stripe for secure credit card processing. Funds are deposited directly into your bank account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
