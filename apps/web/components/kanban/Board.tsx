"use client";
import React from "react";
import { OrderStatus } from "@/types";
import { OrderCard } from "./OrderCard";
import { useRealtimeOrders } from "@/hooks/use-realtime-orders";

const COLUMNS: { id: OrderStatus; label: string }[] = [
  { id: 'placed', label: "New" },
  { id: 'processing', label: "Processing" },
  { id: 'ready_for_delivery', label: "Ready" },
  { id: 'en_route_delivery', label: "Out for Delivery" },
  { id: 'delivered', label: "Completed" }
];

export default function KanbanBoard() {
  const { orders, loading, error } = useRealtimeOrders("1");
  const [localOrders, setLocalOrders] = React.useState<typeof orders>([]);

  React.useEffect(() => {
    if (orders.length > 0) setLocalOrders(orders);
  }, [orders]);

  const handleMove = async (orderId: string, direction: 'next' | 'prev') => {
    let movedOrder: any = null;
    let newStatus: string = "";

    // 1. Optimistic UI Update
    setLocalOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const currentIndex = COLUMNS.findIndex(c => c.id === order.status);
      let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

      // Bounds check
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= COLUMNS.length) newIndex = COLUMNS.length - 1;

      newStatus = COLUMNS[newIndex].id;
      movedOrder = { ...order, status: newStatus };
      return movedOrder;
    }));

    // 2. Persist to Firestore
    if (movedOrder && newStatus) {
      try {
        const { doc, updateDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase/config");

        await updateDoc(doc(db, "orders", orderId), {
          status: newStatus
        });
        console.log("Order status updated in Firestore");
      } catch (err) {
        console.error("Failed to update Firestore:", err);
        alert("Failed to save status change. Please refresh.");
        // Revert local state if needed (omitted for brevity)
      }
    }

    // 3. Trigger SMS if moved to "Ready"
    if (newStatus === "ready" && movedOrder?.phoneNumber) {
      console.log("Triggering SMS for order:", movedOrder.id);
      try {
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "sms",
            to: movedOrder.phoneNumber,
            content: `Hi ${movedOrder.customerName}, your laundry order is READY for pickup! Total: $${movedOrder.totalPrice.toFixed(2)}`
          })
        });
        console.log("SMS sent successfully");
      } catch (err) {
        console.error("Failed to send SMS:", err);
      }
    }
  };

  const handlePay = async (order: any) => {
    console.log("Initiating payment for:", order.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.totalPrice,
          customerEmail: "customer@example.com", // Mock email for now
          orderId: order.id
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment Error. Check console.");
    }
  };

  if (loading) return <div className="p-10 text-slate-400">Loading optimized board...</div>;
  if (error) return <div className="p-10 text-red-400">Error: {error}</div>;

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 snap-x">
      {COLUMNS.map((col) => (
        <div key={col.id} className="snap-center min-w-[280px] flex flex-col bg-slate-100 rounded-xl h-full">
          <div className="p-3 border-b border-slate-200 font-bold text-xs uppercase text-slate-500">{col.label}</div>
          <div className="p-2 flex-1 overflow-y-auto">
            {localOrders.filter(o => o.status === col.id).map(o => (
              <OrderCard key={o.id} order={o} onMove={handleMove} onPay={handlePay} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}