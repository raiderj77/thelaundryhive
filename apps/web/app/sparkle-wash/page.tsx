import React from "react";
import Link from "next/link";
import { Hexagon, LogOut, Info } from "lucide-react";
import DemoBoard from "@/components/demo/DemoBoard";

export default function DemoPage() {
    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
            {/* Demo Header */}
            <header className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-hive-primary/20 p-2 rounded-lg">
                        <Hexagon className="text-hive-primary fill-hive-primary" size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Sparkle Wash <span className="text-xs bg-hive-primary text-slate-900 px-2 py-0.5 rounded ml-2 uppercase tracking-wider">Demo Mode</span></h1>
                        <p className="text-xs text-slate-400">Try moving cards to see how it works!</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                        <Info size={14} />
                        <span>Data resets on refresh</span>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium hover:text-hive-primary transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Exit Demo</span>
                    </Link>
                    <Link
                        href="/dashboard/kanban"
                        className="bg-hive-primary text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-hive-primary/20"
                    >
                        Start Free Trial
                    </Link>
                </div>
            </header>

            {/* Demo Content */}
            <main className="flex-1 overflow-hidden p-4 md:p-6 relative">
                <DemoBoard />

                {/* Helper Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium animate-bounce pointer-events-none">
                    👆 Tap any card to move it forward!
                </div>
            </main>
        </div>
    );
}
