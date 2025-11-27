"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Hexagon, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white hover:opacity-80 transition">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                        <Hexagon className="text-black fill-black" size={24} />
                    </div>
                    <span>Laundry<span className="text-yellow-500">Hive</span></span>
                </Link>

                {/* Desktop Nav - Dashboard Style */}
                <div className="hidden md:flex items-center gap-1">
                    <Link href="/features" className="px-4 py-2 text-slate-300 font-medium hover:text-white hover:bg-white/5 rounded-lg transition">Features</Link>
                    <Link href="/pricing" className="px-4 py-2 text-slate-300 font-medium hover:text-white hover:bg-white/5 rounded-lg transition">Pricing</Link>
                    <Link href="/faq" className="px-4 py-2 text-slate-300 font-medium hover:text-white hover:bg-white/5 rounded-lg transition">FAQ</Link>
                    <div className="h-6 w-px bg-white/10 mx-2"></div>
                    <Link href="/login" className="px-4 py-2 text-white font-bold hover:bg-white/10 rounded-lg transition">Log In</Link>
                    <Link href="/pricing" className="ml-2 bg-yellow-500 text-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20 flex items-center gap-2">
                        Get Started <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:bg-white/10 rounded-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0F172A] border-b border-white/10 p-4 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
                    <Link href="/features" className="p-3 text-slate-300 font-medium hover:bg-white/5 rounded-lg" onClick={() => setIsOpen(false)}>Features</Link>
                    <Link href="/pricing" className="p-3 text-slate-300 font-medium hover:bg-white/5 rounded-lg" onClick={() => setIsOpen(false)}>Pricing</Link>
                    <Link href="/faq" className="p-3 text-slate-300 font-medium hover:bg-white/5 rounded-lg" onClick={() => setIsOpen(false)}>FAQ</Link>
                    <div className="h-px bg-white/10 my-1"></div>
                    <Link href="/login" className="p-3 text-white font-bold hover:bg-white/5 rounded-lg" onClick={() => setIsOpen(false)}>Log In</Link>
                    <Link href="/pricing" className="p-3 bg-yellow-500 text-black font-bold rounded-lg text-center" onClick={() => setIsOpen(false)}>
                        Start Free Trial
                    </Link>
                </div>
            )}
        </nav>
    );
}
