"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Calendar, Clock } from "lucide-react";
import { Preferences } from "@/components/customer/Preferences";
import { Order } from "@/types";

export default function NewOrderPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<Partial<Order>>({
        customerName: "",
        phoneNumber: "",
        address: { formatted: "" },
        preferences: { detergent: "scented", folding: "standard" },
        pickupWindow: { start: "", end: "" },
    });

    const [notes, setNotes] = useState("");

    // Generate next 48 hours of slots (Mock)
    const generateSlots = () => {
        const slots = [];
        const now = new Date();
        for (let i = 0; i < 8; i++) {
            const time = new Date(now.getTime() + (i + 1) * 2 * 60 * 60 * 1000); // Every 2 hours
            slots.push(time);
        }
        return slots;
    };
    const slots = generateSlots();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Order Created Successfully! (Mock)");
            router.push("/dashboard/kanban");
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    {step === 1 ? "New Order Details" : "Preferences & Scheduling"}
                </h1>
                <button onClick={() => router.back()} className="text-slate-500 hover:text-slate-700">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                        value={formData.customerName}
                                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                        value={formData.phoneNumber}
                                        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                    value={formData.address?.formatted}
                                    onChange={e => setFormData({ ...formData, address: { ...formData.address, formatted: e.target.value } })}
                                    placeholder="123 Main St, Apt 4B"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Preferences Component */}
                            <Preferences
                                preferences={formData.preferences as any}
                                onChange={(prefs) => setFormData({ ...formData, preferences: prefs })}
                            />

                            {/* Scheduling */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Calendar size={16} className="text-hive-accent" /> Pickup Window
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {slots.map((slot, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                pickupWindow: {
                                                    start: slot.toISOString(),
                                                    end: new Date(slot.getTime() + 2 * 60 * 60 * 1000).toISOString()
                                                }
                                            })}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.pickupWindow?.start === slot.toISOString()
                                                    ? 'border-hive-accent bg-hive-accent text-white'
                                                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                                }`}
                                        >
                                            <div className="text-xs opacity-80">{slot.toLocaleDateString(undefined, { weekday: 'short' })}</div>
                                            <div>{slot.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                                <textarea
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none h-24 resize-none"
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Gate code: 1234..."
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                            >
                                Back
                            </button>
                        )}

                        {step === 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="bg-hive-primary text-hive-dark px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
                            >
                                Next: Preferences
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-hive-primary text-hive-dark px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-hive-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : <><Save size={18} /> Confirm Order</>}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
