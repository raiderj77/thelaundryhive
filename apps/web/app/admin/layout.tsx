import React from "react";
import { LayoutDashboard, Users, CreditCard, Settings, Rocket } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0B0C15] text-white font-sans selection:bg-purple-500 selection:text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/10 bg-[#0B0C15] flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <Rocket size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Antigravity</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Mission Control" />
                    <NavLink href="/admin/tenants" icon={<Users size={20} />} label="Tenants" />
                    <NavLink href="/admin/finance" icon={<CreditCard size={20} />} label="Global Revenue" />
                    <NavLink href="/admin/settings" icon={<Settings size={20} />} label="Platform Settings" />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xs font-bold">
                            SA
                        </div>
                        <div className="text-sm">
                            <div className="font-medium">Super Admin</div>
                            <div className="text-white/40 text-xs">god_mode@antigravity.io</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pl-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0B0C15]/50 backdrop-blur sticky top-0 z-10">
                    <div className="text-sm text-white/40">Platform Version <span className="text-white/60 font-mono">v1.0.0-alpha</span></div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">Documentation</button>
                        <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">Support</button>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all group"
        >
            <span className="group-hover:text-purple-400 transition-colors">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}
