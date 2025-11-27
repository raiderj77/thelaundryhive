"use client";
import React, { useState, useEffect } from "react";
import { Save, Store, Bell, DollarSign, CreditCard, CheckCircle, Palette } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
    const { tenantId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        storeName: "The Laundry Hive",
        address: "123 Main St, San Francisco, CA",
        phone: "(555) 123-4567",
        pricePerLb: "1.50",
        enableSms: true,
        enableEmail: true,
        stripeConnected: false,
        brandColor: "#18181B", // Default hive-primary
        logoUrl: ""
    });

    // Load settings from Firestore on mount
    useEffect(() => {
        if (!tenantId) return;
        const loadSettings = async () => {
            try {
                const docRef = doc(db, "tenants", tenantId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSettings(prev => ({ ...prev, ...docSnap.data() }));
                }
            } catch (err) {
                console.error("Failed to load settings:", err);
            }
        };
        loadSettings();
    }, [tenantId]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantId) return;
        setLoading(true);
        try {
            await setDoc(doc(db, "tenants", tenantId), settings, { merge: true });
            alert("Settings Saved Successfully!");
        } catch (err) {
            console.error("Error saving settings:", err);
            alert("Failed to save settings.");
        } finally {
            setLoading(false);
        }
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

                {/* Branding / White Label Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
                        <Palette size={18} /> Branding & White Label
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Brand Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        className="h-10 w-10 rounded cursor-pointer border border-slate-200"
                                        value={settings.brandColor}
                                        onChange={e => setSettings({ ...settings, brandColor: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none uppercase"
                                        value={settings.brandColor}
                                        onChange={e => setSettings({ ...settings, brandColor: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Primary color for buttons and highlights.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/logo.png"
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                    value={settings.logoUrl}
                                    onChange={e => setSettings({ ...settings, logoUrl: e.target.value })}
                                />
                                <p className="text-xs text-slate-500 mt-1">Direct link to your transparent PNG logo.</p>
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
                                    onClick={async () => {
                                        try {
                                            const res = await fetch('/api/stripe/connect', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ tenantId: '1' }) // Hardcoded for MVP
                                            });
                                            const data = await res.json();
                                            if (data.url) {
                                                window.location.href = data.url;
                                            } else {
                                                alert('Failed to initiate Stripe Connect');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            alert('Error connecting to Stripe');
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
                        className="bg-hive-primary text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-hive-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : <><Save size={18} /> Save Settings</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
