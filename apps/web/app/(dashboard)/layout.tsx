"use client";
import Link from "next/link";
import { Hexagon, LayoutDashboard, Truck, PlusCircle, Users, Settings, Cpu, TrendingUp } from "lucide-react";
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 gap-2 font-bold border-b border-slate-800">
          <Hexagon className="text-yellow-500 fill-yellow-500" /> Laundry<span className="text-yellow-500">Hive</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard/orders/new" className="flex gap-3 px-3 py-2 text-white bg-hive-primary hover:brightness-110 transition-all rounded-lg text-sm font-bold"><PlusCircle size={18} className="text-white" /> New Order</Link>
          <div className="h-px bg-slate-800 my-2"></div>
          <Link href="/dashboard/kanban" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><LayoutDashboard size={18} /> Ops Board</Link>
          <Link href="/dashboard/machines" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Cpu size={18} /> Machines</Link>
          <Link href="/dashboard/drivers" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Truck size={18} /> Drivers</Link>
          <Link href="/dashboard/customers" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Users size={18} /> Customers</Link>
          <Link href="/dashboard/growth" className="flex gap-3 px-3 py-2 text-amber-500 hover:text-amber-400 rounded-lg text-sm font-bold"><TrendingUp size={18} /> Growth 🔥</Link>
          <div className="flex-1"></div>
          <Link href="/dashboard/settings" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Settings size={18} /> Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col h-screen">{children}</main>
    </div>
  );
}