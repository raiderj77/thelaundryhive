"use client";
import React, { useState, useEffect } from "react";
import { OrderCard } from "@/components/kanban/OrderCard";
import { useHaptic } from "@/hooks/use-haptic";
import { Bell } from "lucide-react";

// Demo-specific types (simplified for demo purposes)
type DemoOrderStatus = "new" | "washing" | "drying" | "folding" | "ready";

interface DemoOrder {
    id: string;
    tenantId: string;
    customerId: string;
    customerName: string;
    customerPhone?: string;
    status: DemoOrderStatus;
    total: number;
    driverName?: string;
}

const COLUMNS: { id: DemoOrderStatus; label: string }[] = [
    { id: "new", label: "New" },
    { id: "washing", label: "Washing" },
    { id: "drying", label: "Drying" },
    { id: "folding", label: "Folding" },
    { id: "ready", label: "Ready" }
];

const DEMO_ORDERS: DemoOrder[] = [
    { id: "1", tenantId: "demo", customerId: "c1", customerName: "Alice Johnson", status: "new", total: 24.50, customerPhone: "+15550101" },
    { id: "2", tenantId: "demo", customerId: "c2", customerName: "Bob Smith", status: "washing", total: 45.00, customerPhone: "+15550102", driverName: "Dave" },
    { id: "3", tenantId: "demo", customerId: "c3", customerName: "Charlie Brown", status: "drying", total: 18.75, customerPhone: "+15550103" },
    { id: "4", tenantId: "demo", customerId: "c4", customerName: "Diana Prince", status: "folding", total: 62.00, customerPhone: "+15550104", driverName: "Sarah" },
];

export default function DemoBoard() {
    const [orders, setOrders] = useState<DemoOrder[]>(DEMO_ORDERS);
    const [toast, setToast] = useState<string | null>(null);
    const { success, light } = useHaptic();

    // Simulate incoming order
    useEffect(() => {
        const timer = setTimeout(() => {
            const newOrder: DemoOrder = {
                id: "5",
                tenantId: "demo",
                customerId: "c5",
                customerName: "New Customer (Demo)",
                status: "new",
                total: 30.00,
            };
            setOrders(prev => [...prev, newOrder]);
            showToast("New Order Received: New Customer");
            success();
        }, 5000);
        return () => clearTimeout(timer);
    }, [success]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleMove = (orderId: string, direction: 'next' | 'prev') => {
        light();
        const statusFlow: DemoOrderStatus[] = ["new", "washing", "drying", "folding", "ready"];

        setOrders(prev => prev.map(o => {
            if (o.id !== orderId) return o;

            const currentIndex = statusFlow.indexOf(o.status);
            let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

            // Bounds check
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= statusFlow.length) newIndex = statusFlow.length - 1;

            const nextStatus = statusFlow[newIndex];

            if (o.status !== nextStatus) {
                if (nextStatus === "ready") {
                    showToast("Order Ready! SMS sent to customer.");
                    success();
                } else {
                    showToast(`Moved to ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}`);
                }
            }

            return { ...o, status: nextStatus };
        }));
    };

    return (
        <div className="relative h-full">
            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-20 right-4 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-right z-50">
                    <Bell size={18} className="text-hive-primary" />
                    <span className="text-sm font-medium">{toast}</span>
                </div>
            )}

            <div className="flex h-full gap-4 overflow-x-auto pb-4 snap-x">
                {COLUMNS.map((col) => (
                    <div key={col.id} className="snap-center min-w-[280px] flex flex-col bg-slate-100 rounded-xl h-full">
                        <div className="p-3 border-b border-slate-200 font-bold text-xs uppercase text-slate-500 flex justify-between">
                            {col.label}
                            <span className="bg-slate-200 text-slate-600 px-2 rounded-full">{orders.filter(o => o.status === col.id).length}</span>
                        </div>
                        <div className="p-2 flex-1 overflow-y-auto">
                            {orders.filter(o => o.status === col.id).map(o => (
                                <div key={o.id} className="hover:scale-[1.02] transition-transform">
                                    <OrderCard order={o as any} onMove={handleMove} />
                                </div>
                            ))}
                            {orders.filter(o => o.status === col.id).length === 0 && (
                                <div className="text-center p-4 text-slate-500 text-xs italic">No orders</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
