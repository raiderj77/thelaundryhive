"use client";
import React, { useState } from "react";
import { Search, UserPlus, Phone, Mail, History } from "lucide-react";

// Mock Data
const MOCK_CUSTOMERS = [
    { id: 1, name: "Sarah Connor", phone: "+1 (555) 000-0001", email: "sarah@example.com", orders: 12, lastVisit: "2 days ago" },
    { id: 2, name: "John Wick", phone: "+1 (555) 000-0002", email: "john@continental.com", orders: 45, lastVisit: "1 week ago" },
    { id: 3, name: "Ellen Ripley", phone: "+1 (555) 000-0003", email: "ripley@nostromo.com", orders: 3, lastVisit: "1 month ago" },
    { id: 4, name: "Marty McFly", phone: "+1 (555) 000-0004", email: "marty@future.com", orders: 8, lastVisit: "Yesterday" },
];

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
                <button className="bg-hive-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-sm">
                    <UserPlus size={18} /> Add Customer
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-hive-primary focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">History</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900">{customer.name}</div>
                                        <div className="text-xs text-slate-400">ID: #{customer.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                            <Phone size={14} className="text-slate-400" /> {customer.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail size={14} className="text-slate-400" /> {customer.email}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-slate-900 font-medium">{customer.orders} Orders</div>
                                        <div className="text-xs text-slate-500">Last seen {customer.lastVisit}</div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-slate-400 hover:text-hive-primary p-2 rounded-full hover:bg-hive-primary/10 transition-colors">
                                            <History size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredCustomers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No customers found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
}
