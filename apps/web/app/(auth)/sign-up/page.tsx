"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [storeName, setStoreName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create Tenant (Store)
            const tenantData = {
                ownerId: user.uid,
                storeName: storeName,
                slug: storeName.toLowerCase().replace(/\s+/g, '-'),
                brandColor: "#18181B", // Default
                createdAt: Timestamp.now(),
                stripeChargesEnabled: false
            };

            await addDoc(collection(db, "tenants"), tenantData);

            // 3. Redirect
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Sign Up Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Start Your Laundry Business</h1>
                    <p className="text-slate-500">Create your white-label store in seconds.</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Sparkle Wash"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Create My Store"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Already have an account? <Link href="/sign-in" className="text-yellow-600 font-bold hover:underline">Sign In</Link>
                </div>
            </div>
        </div>
    );
}
