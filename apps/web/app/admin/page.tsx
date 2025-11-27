"use client";
import React from "react";
import { TrendingUp, Users, ShoppingBag, Activity } from "lucide-react";
import { useAdminStats } from "@/hooks/use-admin-stats";

export default function AdminDashboard() {
    const { stats, loading } = useAdminStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Mission Control</h1>
                <p className="text-white/40 mt-1">Real-time platform telemetry.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={loading ? "..." : `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    change="+12.5%" // In a real app, calculate vs last month
                    icon={<TrendingUp size={24} className="text-green-400" />}
                />
                <StatCard
                    title="Active Tenants"
                    value={loading ? "..." : stats.tenants.toString()}
                    change="Live"
                    icon={<Users size={24} className="text-blue-400" />}
                />
                <StatCard
                    title="Total Orders"
                    value={loading ? "..." : stats.orders.toString()}
                    change="All time"
                    icon={<ShoppingBag size={24} className="text-purple-400" />}
                />
                <StatCard
                    title="System Health"
                    value="100%"
                    change="Stable"
                    icon={<Activity size={24} className="text-emerald-400" />}
                />
            </div>

            {/* Recent Activity / Map Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">Revenue Velocity</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-white/20">
                        [Chart Component Placeholder]
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">New Tenants</h3>
                    <div className="space-y-4">
                        {/* Placeholder for recent tenants list */}
                        <div className="text-white/40 text-sm italic">No recent signups</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
                <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{change}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-sm text-white/40">{title}</div>
        </div>
    );
}
