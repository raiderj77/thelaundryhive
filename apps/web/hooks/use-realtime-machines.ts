"use client";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Machine } from "@/types";

export const useRealtimeMachines = (storeId: string) => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!storeId) return;

        console.log("useRealtimeMachines: Subscribing to machines for store:", storeId);

        // In a real app, we would filter by tenantId/storeId
        // const q = query(collection(db, "machines"), where("tenantId", "==", storeId));

        // For demo simplicity, we'll just fetch all machines or create a collection if empty
        const q = query(collection(db, "machines"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const machineData: Machine[] = [];
            snapshot.forEach((doc) => {
                machineData.push({ id: doc.id, ...doc.data() } as Machine);
            });

            // Sort by name
            machineData.sort((a, b) => a.name.localeCompare(b.name));

            setMachines(machineData);
            setLoading(false);
        }, (err) => {
            console.error("useRealtimeMachines Error:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [storeId]);

    const addMachine = async (machine: Omit<Machine, "id">) => {
        try {
            console.log("Attempting to add machine:", machine);
            await addDoc(collection(db, "machines"), {
                ...machine,
                tenantId: storeId,
                createdAt: Date.now()
            });
            console.log("Machine added successfully");
        } catch (err: any) {
            console.error("Error adding machine:", err);
            console.error("Error code:", err.code);
            console.error("Error message:", err.message);
            // Re-throw so the UI can show it (or handle it here)
            alert(`Failed to add machine: ${err.message}`);
            throw err;
        }
    };

    const updateMachineStatus = async (machineId: string, status: Machine['status'], timeLeft?: number, cycle?: string) => {
        try {
            const updateData: any = { status };
            if (timeLeft !== undefined) updateData.timeLeft = timeLeft;
            if (cycle !== undefined) updateData.cycle = cycle;

            await updateDoc(doc(db, "machines", machineId), updateData);
        } catch (err) {
            console.error("Error updating machine:", err);
            throw err;
        }
    };

    return { machines, loading, error, addMachine, updateMachineStatus };
};
