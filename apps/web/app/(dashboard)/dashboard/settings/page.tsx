"use client";
import React, { useState } from "react";
import { Save, Store, Bell, DollarSign, CreditCard, CheckCircle } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        storeName: "The Laundry Hive",
        address: "123 Main St, San Francisco, CA",
        phone: "(555) 123-4567",
        pricePerLb: "1.50",
        enableSms: true,
        enableEmail: true,
        stripeConnected: false
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Settings Saved Successfully!");
        }, 800);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Store Settings</h1>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
                        <Store size={18} /> Store Profile
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                value={settings.storeName}
                                onChange={e => setSettings({ ...settings, storeName: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                    value={settings.address}
                                    onChange={e => setSettings({ ...settings, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                    value={settings.phone}
                                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
                        <DollarSign size={18} /> Pricing
                    </div>
                    <div className="p-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Base Price (per lb)</label>
                        <div className="relative max-w-xs">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full pl-8 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                value={settings.pricePerLb}
                                onChange={e => setSettings({ ...settings, pricePerLb: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Payouts Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
                        <CreditCard size={18} /> Payouts & Banking
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-900">Stripe Connect</div>
                                <div className="text-sm text-slate-500">Link your bank account to receive payouts.</div>
                            </div>
                            {settings.stripeConnected ? (
                                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                                    <CheckCircle size={18} /> Connected
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Simulate Stripe OAuth
                                        const width = 600, height = 700;
                                        const left = (window.innerWidth - width) / 2;
                                        const top = (window.innerHeight - height) / 2;
                                        const popup = window.open('', 'Stripe Connect', `width=${width},height=${height},top=${top},left=${left}`);
                                        if (popup) {
                                            popup.document.write('<h1>Connecting to Stripe...</h1><p>Please wait...</p>');
                                            setTimeout(() => {
                                                popup.close();
                                                setSettings({ ...settings, stripeConnected: true });
                                                alert("Stripe Connected Successfully!");
                                            }, 2000);
                                        }
                                    }}
                                    className="bg-[#635BFF] hover:bg-[#5851E1] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    Connect with Stripe
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
                        <Bell size={18} /> Notifications
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-900">SMS Notifications</div>
                                <div className="text-sm text-slate-500">Send text updates to customers</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={settings.enableSms} onChange={e => setSettings({ ...settings, enableSms: e.target.checked })} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-hive-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-900">Email Receipts</div>
                                <div className="text-sm text-slate-500">Send digital receipts automatically</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={settings.enableEmail} onChange={e => setSettings({ ...settings, enableEmail: e.target.checked })} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-hive-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-hive-primary text-hive-dark px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-hive-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : <><Save size={18} /> Save Settings</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
