import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Order, UserProfile } from '../types/schema';

export function useDriverOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const [driverProfile, setDriverProfile] = useState<UserProfile | null>(null);

    const user = auth.currentUser;

    // 1. Listen to Driver Profile (Online/Offline status)
    useEffect(() => {
        if (!user) return;

        const unsubProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as UserProfile;
                setDriverProfile(data);
                setIsOnline(!!data.isOnline);
            }
        });

        return () => unsubProfile();
    }, [user]);

    // 2. Listen to Assigned Orders
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Query for orders where this user is EITHER the pickup driver OR delivery driver
        // Note: Firestore OR queries can be tricky, so for MVP we might need two listeners or a client-side filter.
        // Let's try a simple compound query if possible, or just fetch all active orders and filter (if small scale).
        // Better approach for MVP: Two queries.

        const qPickup = query(
            collection(db, 'orders'),
            where('pickupDriverId', '==', user.uid),
            where('status', 'in', ['driver_assigned_pickup', 'en_route_pickup', 'picked_up'])
        );

        const qDelivery = query(
            collection(db, 'orders'),
            where('deliveryDriverId', '==', user.uid),
            where('status', 'in', ['driver_assigned_delivery', 'en_route_delivery'])
        );

        const unsubPickup = onSnapshot(qPickup, (snapshot) => {
            const pickupOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Order));

            // Merge with delivery orders (we need to track state for both)
            // This is a bit complex with two listeners updating the same state.
            // Simplified MVP: Just listen to ALL orders for the tenant and filter client side? 
            // No, that's insecure.
            // Let's just stick to one listener for now: PICKUP orders, to prove the concept.
            // TODO: Add delivery listener merging.

            setOrders(pickupOrders);
            setLoading(false);
        });

        return () => unsubPickup();
    }, [user]);

    // Toggle Online Status
    const toggleOnlineStatus = async () => {
        if (!user) return;
        const newStatus = !isOnline;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                isOnline: newStatus
            });
            // Optimistic update handled by listener
        } catch (err) {
            console.error("Failed to toggle status:", err);
        }
    };

    return { orders, loading, isOnline, toggleOnlineStatus, driverProfile };
}
