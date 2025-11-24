import React from "react";
import { Search, MoreVertical, ExternalLink, Ban } from "lucide-react";

export default function TenantsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Tenant Registry</h1>
                    <p className="text-white/40">Manage all registered laundromats.</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                    + Onboard Tenant
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                    type="text"
                    placeholder="Search by name, ID, or owner..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {/* Tenants Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-white/40 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Tenant Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Revenue (Mo)</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                                            L{i}
                                        </div>
                                        <div>
                                            <div className="font-medium">Sparkle Wash #{i}</div>
                                            <div className="text-xs text-white/40">tenant_{i}8293</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-white/60">
                                    Pro Plan
                                </td>
                                <td className="px-6 py-4 font-mono text-white/80">
                                    $2,40{i}.00
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
