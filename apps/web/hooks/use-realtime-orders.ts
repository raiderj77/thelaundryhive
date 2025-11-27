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
        console.log("useRealtimeOrders: Connecting to Firestore...");

        // Import dynamically to ensure client-side execution
        let unsubscribe: () => void;

        const setupListener = async () => {
            try {
                const { collection, query, where, onSnapshot, orderBy, limit } = await import("firebase/firestore");
                const { db } = await import("@/lib/firebase/config");

                // Query: Get orders for this tenant, ordered by creation time
                // Note: You might need a composite index for tenantId + createdAt. 
                // If that fails, remove orderBy for now.
                const q = query(
                    collection(db, "orders"),
                    where("tenantId", "==", storeId)
                    // limit(50)
                );

                unsubscribe = onSnapshot(q, (snapshot) => {
                    console.log("useRealtimeOrders: Snapshot received", snapshot.size);
                    const orderData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Order[];

                    setOrders(orderData);
                    setLoading(false);
                }, (err) => {
                    console.error("useRealtimeOrders: Snapshot Error", err);
                    setError(err.message);
                    setLoading(false);
                });

            } catch (err: any) {
                console.error("useRealtimeOrders: Setup Error", err);
                setError(err.message);
                setLoading(false);
            }
        };

        setupListener();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [storeId]);

    return { orders, loading, error };
};
