import React from "react";
import Navbar from "../../components/Navbar";
import { Check, X } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-hive-wax font-sans">
            <Navbar />

            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-hive-black mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-slate-600">
                        Start small and scale your laundry empire. No hidden fees, cancel anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Starter Tier */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-500 mb-2">Starter</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-hive-black">$49</span>
                                <span className="text-slate-500">/mo</span>
                            </div>
                            <p className="text-slate-500 mt-4">Perfect for single-store operators just getting started.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 1 Store Location</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Up to 500 Orders/mo</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Basic POS</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Customer Web App</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 2,000 API Calls/mo</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 500 SMS Credits</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 1,000 Map Requests</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> White Label Domain</li>
                            <li className="flex items-center gap-3 text-slate-400"><X size={20} /> Driver App</li>
                        </ul>
                        <button className="w-full py-3 px-6 rounded-xl font-bold border-2 border-hive-black text-hive-black hover:bg-hive-black hover:text-white transition">
                            Start Free Trial
                        </button>
                    </div>

                    {/* Growth Tier */}
                    <div className="bg-hive-black p-8 rounded-3xl shadow-2xl border border-hive-black flex flex-col relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-hive-gold text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            MOST POPULAR
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-hive-gold mb-2">Growth</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">$149</span>
                                <span className="text-slate-400">/mo</span>
                            </div>
                            <p className="text-slate-400 mt-4">For growing businesses with delivery fleets.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> Up to 3 Store Locations</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> Unlimited Orders</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> Advanced POS & Inventory</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> Branded Customer App</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> Driver App (2 Drivers)</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> 6,000 API Calls/mo</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> 1,500 SMS Credits</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> 3,000 Map Requests</li>
                            <li className="flex items-center gap-3 text-white"><Check size={20} className="text-hive-gold" /> White Label Domain</li>
                        </ul>
                        <button className="w-full py-3 px-6 rounded-xl font-bold bg-hive-gold text-hive-black hover:brightness-110 transition shadow-lg shadow-hive-gold/20">
                            Get Started
                        </button>
                    </div>

                    {/* Empire Tier */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-500 mb-2">Empire</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-hive-black">$299</span>
                                <span className="text-slate-500">/mo</span>
                            </div>
                            <p className="text-slate-500 mt-4">Full white-label solution for franchises.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Unlimited Locations</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Unlimited Drivers</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Priority Support</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Custom Domain (White Label)</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 12,000 API Calls/mo</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 3,000 SMS Credits</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> 7,000 Map Requests</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> API Access & Webhooks</li>
                            <li className="flex items-center gap-3 text-slate-700"><Check size={20} className="text-green-500" /> Dedicated Success Manager</li>
                        </ul>
                        <button className="w-full py-3 px-6 rounded-xl font-bold border-2 border-hive-black text-hive-black hover:bg-hive-black hover:text-white transition">
                            Contact Sales
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="text-slate-500 text-sm">
                        * Overage Rates: API: $0.01/call | SMS: $0.02/msg | Maps: $0.01/request
                    </p>
                </div>
            </main>
        </div>
    );
}
