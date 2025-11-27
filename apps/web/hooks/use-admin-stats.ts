"use client";
import { useState, useEffect } from "react";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const useAdminStats = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        tenants: 0,
        orders: 0,
        health: "100%"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for orders to calculate revenue
        const ordersUnsub = onSnapshot(collection(db, "orders"), (snapshot) => {
            let totalRevenue = 0;
            let totalOrders = 0;

            snapshot.forEach(doc => {
                const data = doc.data();
                totalOrders++;
                if (data.totalPrice) {
                    totalRevenue += data.totalPrice;
                }
            });

            setStats(prev => ({
                ...prev,
                revenue: totalRevenue,
                orders: totalOrders
            }));
        });

        // Real-time listener for tenants
        const tenantsUnsub = onSnapshot(collection(db, "tenants"), (snapshot) => {
            setStats(prev => ({
                ...prev,
                tenants: snapshot.size
            }));
            setLoading(false);
        });

        return () => {
            ordersUnsub();
            tenantsUnsub();
        };
    }, []);

    return { stats, loading };
};
