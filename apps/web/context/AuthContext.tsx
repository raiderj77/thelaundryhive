"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, onAuthStateChanged, type User } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    tenantId: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    tenantId: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: () => void;
        try {
            unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                console.log("Auth State Changed:", currentUser ? "User Logged In" : "User Logged Out");
                setUser(currentUser);
                if (currentUser) {
                    try {
                        const { collection, query, where, getDocs } = await import("firebase/firestore");
                        const q = query(collection(db, "tenants"), where("ownerId", "==", currentUser.uid));
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            setTenantId(querySnapshot.docs[0].id);
                        } else {
                            console.log("No tenant found for user", currentUser.uid);
                            setTenantId(null);
                        }
                    } catch (error) {
                        console.error("Error fetching tenant:", error);
                    }
                } else {
                    setTenantId(null);
                }
                setLoading(false);
            }, (error) => {
                console.error("Auth Subscription Error:", error);
                setLoading(false);
            });
        } catch (err) {
            console.error("AuthContext Initialization Error:", err);
            setLoading(false);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, tenantId, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
