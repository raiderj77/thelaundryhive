"use client";

import React from "react";
import { useRealtimeOrders } from "@/hooks/use-realtime-orders";
import {
    Activity,
    Truck,
    DollarSign,
    Users,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function CommandCenterPage() {
    const { orders, loading, error } = useRealtimeOrders("1"); // Hardcoded tenant ID for MVP

    // Calculate Stats
    const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
    const revenueToday = orders.reduce((acc, o) => acc + (o.total || 0), 0); // Mock calculation
    const driversOnline = 3; // Mocked for now

    return (
        <div className="p-6 space-y-6 h-full overflow-y-auto bg-slate-50/50">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
                    <p className="text-slate-500">Live operations overview</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/orders/new" className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 flex items-center gap-2">
                        + New Order
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-500">Active Orders</div>
                        <div className="text-2xl font-bold text-slate-900">{loading ? "..." : activeOrders}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-500">Revenue (Today)</div>
                        <div className="text-2xl font-bold text-slate-900">${loading ? "..." : revenueToday.toFixed(2)}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                        <Truck size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-500">Drivers Online</div>
                        <div className="text-2xl font-bold text-slate-900">{driversOnline}</div>
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">

                {/* Left: Live Order Feed */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400" /> Live Feed
                        </h2>
                        <Link href="/dashboard/kanban" className="text-sm font-medium text-blue-600 hover:underline">
                            View Board →
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        {loading && <div className="p-8 text-center text-slate-400">Loading live feed...</div>}
                        {!loading && orders.length === 0 && (
                            <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                    <Clock size={32} className="opacity-20" />
                                </div>
                                <p>No active orders right now.</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            {orders.map((order) => (
                                <div key={order.id} className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${order.status === 'placed' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'ready_for_delivery' ? 'bg-green-100 text-green-700' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {order.customerName?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">
                                                {order.customerName || "Guest Customer"}
                                                <span className="ml-2 text-xs font-normal text-slate-400">#{order.id.slice(0, 4)}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                <span className="capitalize">{order.status.replace(/_/g, " ")}</span>
                                                <span>•</span>
                                                <span>{order.items?.length || 0} items</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="font-bold text-slate-900">${order.total?.toFixed(2) || "0.00"}</div>
                                            <div className="text-xs text-slate-400">Est. 2pm</div>
                                        </div>
                                        <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition">
                                            <MapPin size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Driver Fleet (Mock Map) */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            <Truck size={18} className="text-slate-400" /> Fleet Status
                        </h2>
                    </div>

                    {/* Mock Map Visual */}
                    <div className="flex-1 bg-slate-100 relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12,0/600x600?access_token=pk.mock')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition duration-700"></div>

                        {/* Mock Driver Pins */}
                        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 relative animate-bounce">
                                    <Truck size={14} className="text-black" />
                                </div>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 blur-sm rounded-full"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-8 h-8 bg-slate-800 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 relative">
                                    <Truck size={14} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Active Drivers</span>
                                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">3 Online</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Jason D.</span>
                                    <span className="text-slate-400 text-xs">Idle (5m)</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Sarah M.</span>
                                    <span className="text-slate-400 text-xs">En Route</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
