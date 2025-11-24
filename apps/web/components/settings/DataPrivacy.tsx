"use client";
import React, { useState } from "react";
import { Download, Trash2, AlertTriangle } from "lucide-react";

export default function DataPrivacy() {
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create dummy data blob
        const data = {
            user: { name: "Demo User", email: "demo@example.com" },
            orders: [
                { id: "1", date: "2025-11-23", total: 25.50 },
                { id: "2", date: "2025-11-20", total: 45.00 }
            ]
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "laundry-hive-data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setExporting(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure? This action cannot be undone. All your data will be permanently erased.")) return;

        setDeleting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Request submitted. Your data will be deleted within 30 days in accordance with GDPR.");
        setDeleting(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Data Privacy & Rights</h3>
            <p className="text-sm text-slate-500 mb-6">Manage your personal data in accordance with GDPR and CCPA regulations.</p>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Download size={20} /></div>
                        <div>
                            <div className="font-medium text-slate-900">Export Your Data</div>
                            <div className="text-xs text-slate-500">Download a copy of all your personal data</div>
                        </div>
                    </div>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        {exporting ? "Preparing..." : "Export JSON"}
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg text-red-600"><Trash2 size={20} /></div>
                        <div>
                            <div className="font-medium text-red-900">Delete Account</div>
                            <div className="text-xs text-red-500">Permanently remove your account and data</div>
                        </div>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        {deleting ? "Processing..." : "Delete Data"}
                    </button>
                </div>
            </div>
        </div>
    );
}
