"use client";
import React, { useState, useEffect } from "react";
import { Search, MoreVertical, ExternalLink, Trash2, Edit, Loader2 } from "lucide-react";
import { getAllTenants, deleteTenant, TenantWithMeta } from "@/lib/firebase/tenants";
import CreateTenantModal from "@/components/admin/CreateTenantModal";

export default function TenantsPage() {
    const [tenants, setTenants] = useState<TenantWithMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const loadTenants = async () => {
        setLoading(true);
        try {
            const data = await getAllTenants();
            setTenants(data);
        } catch (error) {
            console.error("Failed to load tenants:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTenants();
    }, []);

    const handleDelete = async (tenantId: string) => {
        if (!confirm("Are you sure you want to delete this tenant? This action cannot be undone.")) {
            return;
        }

        setDeleting(tenantId);
        try {
            await deleteTenant(tenantId);
            await loadTenants();
        } catch (error) {
            console.error("Failed to delete tenant:", error);
            alert("Failed to delete tenant");
        } finally {
            setDeleting(null);
            setActiveMenu(null);
        }
    };

    const filteredTenants = tenants.filter((tenant) => {
        const query = searchQuery.toLowerCase();
        return (
            tenant.name?.toLowerCase().includes(query) ||
            tenant.slug?.toLowerCase().includes(query) ||
            tenant.id?.toLowerCase().includes(query)
        );
    });

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "active":
                return "bg-green-500/20 text-green-400";
            case "inactive":
                return "bg-yellow-500/20 text-yellow-400";
            case "suspended":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-green-500/20 text-green-400";
        }
    };

    const getPlanLabel = (plan?: string) => {
        switch (plan) {
            case "starter":
                return "Starter";
            case "pro":
                return "Pro Plan";
            case "enterprise":
                return "Enterprise";
            default:
                return "Starter";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Tenant Registry</h1>
                    <p className="text-white/40">Manage all registered white label customers.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                    + Onboard Tenant
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, slug, or ID..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {/* Tenants Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-purple-500" size={32} />
                    </div>
                ) : filteredTenants.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/40 mb-4">
                            {searchQuery ? "No tenants match your search" : "No tenants yet"}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="text-purple-400 hover:text-purple-300 font-medium"
                            >
                                Create your first white label customer
                            </button>
                        )}
                    </div>
                ) : (
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
                            {filteredTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                                                style={{ backgroundColor: tenant.brandColor || "#6B46C1" }}
                                            >
                                                {tenant.name?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <div className="font-medium">{tenant.name}</div>
                                                <div className="text-xs text-white/40">/{tenant.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                                tenant.status
                                            )}`}
                                        >
                                            {(tenant.status || "active").charAt(0).toUpperCase() +
                                                (tenant.status || "active").slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white/60">
                                        {getPlanLabel(tenant.plan)}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-white/80">
                                        ${(tenant.monthlyRevenue || 0).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={() =>
                                                setActiveMenu(activeMenu === tenant.id ? null : tenant.id)
                                            }
                                            className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeMenu === tenant.id && (
                                            <div className="absolute right-6 top-12 z-10 w-48 bg-zinc-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
                                                <a
                                                    href={`/${tenant.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink size={16} />
                                                    View Storefront
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(tenant.id)}
                                                    disabled={deleting === tenant.id}
                                                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-500/20 text-red-400 transition-colors"
                                                >
                                                    {deleting === tenant.id ? (
                                                        <Loader2 className="animate-spin" size={16} />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                    Delete Tenant
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Create Tenant Modal */}
            <CreateTenantModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={loadTenants}
            />
        </div>
    );
}
