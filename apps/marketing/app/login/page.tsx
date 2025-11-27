import React from "react";
import Navbar from "../../components/Navbar";
import { LayoutDashboard, Smartphone, ArrowRight } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-hive-wax font-sans">
            <Navbar />
            
            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-hive-black mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-xl text-slate-600">
                        Choose your portal to sign in.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Operator Login */}
                    <a href="http://localhost:3000" className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition group">
                        <div className="bg-hive-black w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <LayoutDashboard size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-hive-black mb-2">Operator Dashboard</h2>
                        <p className="text-slate-600 mb-8">
                            For laundromat owners, managers, and drivers. Manage orders, routes, and revenue.
                        </p>
                        <div className="flex items-center gap-2 font-bold text-hive-black group-hover:gap-4 transition-all">
                            Log In <ArrowRight size={20} />
                        </div>
                    </a>

                    {/* Customer Login */}
                    <a href="http://localhost:3000" className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition group">
                        <div className="bg-hive-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <Smartphone size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-hive-black mb-2">Customer App</h2>
                        <p className="text-slate-600 mb-8">
                            For laundry customers. Schedule a pickup, track your order, or update preferences.
                        </p>
                        <div className="flex items-center gap-2 font-bold text-hive-gold group-hover:gap-4 transition-all">
                            Log In <ArrowRight size={20} />
                        </div>
                    </a>
                </div>
            </main>
        </div>
    );
}
