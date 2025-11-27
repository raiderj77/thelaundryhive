"use client";
import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [show, setShow] = useState(false);
    const { success, light } = useHaptic();

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShow(true);
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const install = async () => {
        light();
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            success();
            setShow(false);
        }
        setDeferredPrompt(null);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-50 flex items-center justify-between animate-in slide-in-from-bottom-10">
            <div className="flex items-center gap-3">
                <div className="bg-hive-primary p-2 rounded-lg text-slate-900"><Download size={20} /></div>
                <div>
                    <div className="font-bold text-sm">Install App</div>
                    <div className="text-xs text-slate-600">Add to Home Screen</div>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setShow(false)} className="p-2 hover:bg-white/10 rounded-lg"><X size={18} /></button>
                <button onClick={install} className="bg-hive-primary text-slate-900 px-4 py-2 rounded-lg font-bold text-xs hover:brightness-110">Install</button>
            </div>
        </div>
    );
}
