import { Order } from "@/types";
// import { db } from "@/lib/firebase/config"; 
// import { collection, query, limit, getDocs, Timestamp } from "firebase/firestore";

// MOCK DATA FALLBACK
const MOCK_ORDERS: Order[] = [
    { id: "1", storeId: "1", customerName: "Sarah Connor", status: "washing", type: "pickup", totalPrice: 25.50, createdAt: Date.now(), address: "123 Main", phoneNumber: "+18317894938" },
    { id: "2", storeId: "1", customerName: "John Wick", status: "ready", type: "dropoff", totalPrice: 45.00, createdAt: Date.now() - 100000, address: "Continental Hotel", phoneNumber: "+15550000002" }
];

export async function fetchActiveOrders(storeId: string): Promise<Order[]> {
    // SAFEGUARD: If we are in DEMO mode (no real DB), return mock data
    // In a real app, you might check an env var like process.env.NEXT_PUBLIC_USE_REAL_DB
    if (true) { // Force mock for now to avoid errors since we have no real credentials
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_ORDERS;
    }

    /* 
       OPTIMIZATION: 
       Always use 'limit()' to prevent fetching thousands of old orders.
       Only fetch what is needed for the board (e.g., last 50 active items).
    */
    // const q = query(
    //   collection(db, "orders"), 
    //   limit(50) // <--- COST SAVING SAFEGUARD
    // );

    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

    return [];
}
