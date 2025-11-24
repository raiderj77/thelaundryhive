import React from "react";
import { Order } from "@/types";
import { ChevronRight, ChevronLeft, CreditCard } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";

export const OrderCard = ({ order, onMove, onPay }: { order: Order; onMove: (id: string, dir: 'next' | 'prev') => void; onPay?: (order: Order) => void }) => {
  const { light } = useHaptic();

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200 mb-3 active:scale-[0.98] transition-transform duration-100" onClick={light}>
      <div className="flex justify-between items-start">
        <div>
          <span className="font-bold text-slate-900 block">{order.customerName}</span>
          {order.phoneNumber && <span className="text-xs text-slate-400 block">{order.phoneNumber}</span>}
          {order.driverName && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-1 inline-block">
              🚗 {order.driverName}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">${order.totalPrice.toFixed(2)}</span>
          {onPay && (
            <button
              onClick={(e) => { e.stopPropagation(); onPay(order); }}
              className="text-[10px] flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
            >
              <CreditCard size={10} /> Pay
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 border-t pt-2">
        <button
          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 disabled:opacity-30"
          disabled={order.status === 'new'}
          onClick={(e) => { e.stopPropagation(); light(); onMove(order.id, 'prev'); }}
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{order.status}</span>

        <button
          className="p-1 hover:bg-slate-100 rounded text-hive-primary hover:text-amber-600 disabled:opacity-30"
          disabled={order.status === 'ready'}
          onClick={(e) => { e.stopPropagation(); light(); onMove(order.id, 'next'); }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};