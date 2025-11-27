"use client";
import React from "react";
import { MachineGrid } from "@/components/operator/MachineGrid";
import { Plus, Filter } from "lucide-react";
import { useRealtimeMachines } from "@/hooks/use-realtime-machines";

export default function MachinesPage() {
    const { machines } = useRealtimeMachines("1");

    const stats = {
        total: machines.length,
        available: machines.filter(m => m.status === 'available').length,
        running: machines.filter(m => m.status === 'running').length,
        maintenance: machines.filter(m => m.status === 'maintenance' || m.status === 'offline').length
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Machine Management</h1>
                    <p className="text-slate-500">Monitor and control your washer/dryer fleet.</p>
                </div>

                <div className="flex gap-3 hidden sm:flex">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Fleet</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-green-600 text-sm font-medium mb-1">Available</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.available}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-blue-600 text-sm font-medium mb-1">Running</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.running}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-orange-600 text-sm font-medium mb-1">Maintenance</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.maintenance}</div>
                </div>
            </div>

            <MachineGrid />
        </div>
    );
}
