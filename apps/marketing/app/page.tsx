import React from "react";
import { Hexagon, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-hive-wax text-hive-black font-sans selection:bg-hive-gold selection:text-white">
            {/* Header */}
            <header className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-2xl">
                    <Hexagon className="text-hive-gold fill-hive-gold" size={32} />
                    <span>The Laundry<span className="text-hive-gold">Hive</span></span>
                </div>
                <nav className="hidden md:flex gap-8 font-medium">
                    <a href="#features" className="hover:text-hive-gold transition">Features</a>
                    <a href="#pricing" className="hover:text-hive-gold transition">Pricing</a>
                    <a href="#login" className="hover:text-hive-gold transition">Login</a>
                </nav>
                <button className="bg-hive-black text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition flex items-center gap-2">
                    Join the Colony <ArrowRight size={18} />
                </button>
            </header>

            {/* Hero */}
            <main className="container mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        Turn Your Laundromat into a <span className="text-hive-gold">Gold Mine</span>.
                    </h1>
                    <p className="text-xl text-slate-800 leading-relaxed">
                        The all-in-one platform for modern laundry operators.
                        Automate intake, optimize drivers, and delight customers with your own branded app.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-hive-gold text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-hive-gold/30 hover:-translate-y-1 transition">
                            Start Free Trial
                        </button>
                        <button className="bg-white text-hive-black px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition">
                            Watch Demo
                        </button>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> No Credit Card</span>
                        <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 14-Day Free Trial</span>
                    </div>
                </div>

                {/* Hero Image / Graphic */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-hive-gold/20 rounded-full blur-3xl"></div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 rotate-3 hover:rotate-0 transition duration-500">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                            <div className="font-bold text-lg">Sparkle Wash</div>
                            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">● Live</div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-24 bg-slate-50 rounded-xl w-full animate-pulse"></div>
                            <div className="h-24 bg-slate-50 rounded-xl w-full animate-pulse delay-75"></div>
                            <div className="h-24 bg-slate-50 rounded-xl w-full animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
