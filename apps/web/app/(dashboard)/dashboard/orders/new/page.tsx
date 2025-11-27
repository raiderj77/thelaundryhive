"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Calendar } from "lucide-react";
import { Order, OrderItem } from "@/types";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function NewOrderPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    // Form State matching new Schema
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [addressStr, setAddressStr] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

    // Mock items for now (Wash & Fold)
    const [items] = useState<OrderItem[]>([
        { id: "item_1", name: "Wash & Fold", quantity: 1, unit: "bag", unitPrice: 1.75, totalPrice: 0 }
    ]);

    // Generate next 48 hours of slots
    const [slots] = useState(() => {
        const slots = [];
        const now = new Date();
        now.setMinutes(0, 0, 0);
        for (let i = 0; i < 8; i++) {
            const time = new Date(now.getTime() + (i + 1) * 2 * 60 * 60 * 1000);
            slots.push(time);
        }
        return slots;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        if (!selectedSlot) {
            alert("Please select a pickup window!");
            return;
        }

        setLoading(true);

        try {
            const pickupStart = Timestamp.fromDate(selectedSlot);
            const pickupEnd = Timestamp.fromDate(new Date(selectedSlot.getTime() + 2 * 60 * 60 * 1000));

            const newOrder: Partial<Order> = {
                tenantId: "1",
                customerId: "cust_" + Date.now(),
                customerName: customerName,
                customerPhone: customerPhone,

                status: "placed",
                paymentStatus: "pending",

                pickupAddress: {
                    street: addressStr,
                    city: "San Francisco", // Mock
                    state: "CA",
                    zip: "94103",
                    lat: 0, lng: 0,
                    instructions: notes
                },
                deliveryAddress: { // Same as pickup for now
                    street: addressStr,
                    city: "San Francisco",
                    state: "CA",
                    zip: "94103",
                    lat: 0, lng: 0
                },

                pickupWindow: { start: pickupStart, end: pickupEnd },

                items: items,
                subtotal: 0,
                tax: 0,
                tip: 0,
                deliveryFee: 5.00,
                discount: 0,
                total: 0, // Will be calculated on weigh-in

                bagCount: 0,
                photos: [],
                timeline: [{
                    status: "placed",
                    timestamp: Timestamp.now(),
                    description: "Order created manually by operator"
                }],

                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            };

            await addDoc(collection(db, "orders"), newOrder);

            // Trigger SMS (Mock)
            if (customerPhone) {
                fetch("/api/notify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        type: "sms",
                        to: customerPhone,
                        content: `Hi ${customerName}, thanks for your order! Pickup scheduled for ${selectedSlot.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`
                    })
                }).catch(console.error);
            }

            router.push("/dashboard");
        } catch (error: any) {
            console.error("Error creating order:", error);
            alert(`Failed to create order: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    {step === 1 ? "New Order Details" : "Scheduling"}
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
                                        value={customerName}
                                        onChange={e => setCustomerName(e.target.value)}
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                                        value={customerPhone}
                                        onChange={e => setCustomerPhone(e.target.value)}
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
                                    value={addressStr}
                                    onChange={e => setAddressStr(e.target.value)}
                                    placeholder="123 Main St, Apt 4B"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Calendar size={16} className="text-hive-accent" /> Pickup Window
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {slots.map((slot, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedSlot === slot
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notes / Gate Code</label>
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
                                type="submit"
                                className="bg-hive-primary text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
                            >
                                Next: Scheduling
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-hive-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-hive-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
