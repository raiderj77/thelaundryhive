"use client";

import React, { useState } from "react";
import {
    TrendingUp,
    Copy,
    Share2,
    DollarSign,
    Users,
    CreditCard,
    ArrowUpRight
} from "lucide-react";

export default function GrowthPage() {
    const [referralCode] = useState("JAS-9X2A"); // Mock for now
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://thelaundryhive.com/join?ref=${referralCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <TrendingUp className="text-amber-500" size={32} /> Growth Engine
                    </h1>
                    <p className="text-slate-500 mt-2">Track your referrals, commissions, and payouts.</p>
                </div>
                <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg font-medium border border-amber-100">
                    🔥 You are a <span className="font-bold">Tier 1 Affiliate</span> (25% Commission)
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">+12% this month</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">$1,250.00</div>
                    <div className="text-sm text-slate-500 mt-1">Total Earnings</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">48</div>
                    <div className="text-sm text-slate-500 mt-1">Active Referrals</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <CreditCard size={24} />
                        </div>
                        <button className="text-xs font-bold text-purple-600 hover:underline">Manage Payouts</button>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">$320.00</div>
                    <div className="text-sm text-slate-500 mt-1">Available for Payout</div>
                </div>
            </div>

            {/* Referral Tools */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Share the Hive 🐝</h2>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            Share your unique link with laundromats or customers.
                            You earn <span className="text-amber-400 font-bold">25% recurring commission</span> for every operator you refer,
                            and <span className="text-amber-400 font-bold">$10 credit</span> for every customer.
                        </p>

                        <div className="flex gap-3">
                            <div className="flex-1 bg-slate-800 rounded-xl flex items-center px-4 border border-slate-700">
                                <span className="text-slate-400 text-sm truncate">https://thelaundryhive.com/join?ref={referralCode}</span>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                            >
                                {copied ? <span className="text-slate-900">Copied!</span> : <><Copy size={18} /> Copy Link</>}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Share2 size={18} className="text-amber-400" /> Quick Share
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">Facebook</button>
                            <button className="p-3 bg-sky-500 hover:bg-sky-400 rounded-lg font-medium transition-colors">Twitter</button>
                            <button className="p-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors">WhatsApp</button>
                            <button className="p-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-medium transition-colors">Instagram</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Commissions Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Recent Commissions</h3>
                    <button className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1">
                        View All <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Source</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">Sparkle Wash LLC</td>
                                    <td className="px-6 py-4 text-slate-500">Subscription (Pro)</td>
                                    <td className="px-6 py-4 text-slate-500">Nov {26 - i}, 2025</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${i === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {i === 1 ? 'Pending' : 'Available'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">+$25.00</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
