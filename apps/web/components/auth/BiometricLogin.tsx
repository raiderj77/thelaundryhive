"use client";
import React, { useState } from "react";
import { Fingerprint, ScanFace } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";
import { useRouter } from "next/navigation";

export default function BiometricLogin() {
    const [loading, setLoading] = useState(false);
    const { success, error, light } = useHaptic();
    const router = useRouter();

    const handleLogin = async () => {
        light();
        setLoading(true);

        try {
            // Check if available
            if (!window.PublicKeyCredential) {
                alert("Biometrics not supported on this device.");
                return;
            }

            // SIMULATED WebAuthn Call (Triggering the native prompt requires a challenge)
            // In a real app, you fetch options from server: const options = await fetch('/api/auth/options');
            // For demo/light build, we simulate the delay and success

            // To actually trigger the prompt we need real options, which is too heavy for this "light" build 
            // without a backend. So we will simulate the UI experience.

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate success
            success();
            router.push("/dashboard/kanban");

        } catch (err) {
            error();
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm transition-all active:scale-95"
        >
            {loading ? <span className="animate-pulse">Scanning...</span> : (
                <>
                    <Fingerprint size={20} className="text-hive-primary" />
                    <span className="text-sm font-medium">Quick Login</span>
                </>
            )}
        </button>
    );
}
