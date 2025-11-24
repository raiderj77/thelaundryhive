"use client";
import { useState, useEffect } from "react";
// import { collection, query, limit, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
import { Order } from "@/types";
import { fetchActiveOrders } from "@/lib/api/orders";

export const useRealtimeOrders = (storeId: string) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("useRealtimeOrders: Starting fetch...");
        let mounted = true;

        // FORCE MOCK MODE: Remove complexity for now
        fetchActiveOrders(storeId)
            .then(data => {
                console.log("useRealtimeOrders: Data received", data);
                if (mounted) {
                    setOrders(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("useRealtimeOrders: Error", err);
                if (mounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { mounted = false; };
    }, [storeId]);

    return { orders, loading, error };
};
