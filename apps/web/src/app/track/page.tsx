'use client';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useSearchParams, useRouter } from 'next/navigation';

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-gray-500 animate-pulse">Locating your laundry...</div>
    </div>
  );
  
  if (!orderId) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Track Your Order</h1>
        <p className="text-gray-500 mb-6">Enter your order ID below to see status updates.</p>
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            id="order-search"
            placeholder="e.g. HIVE-12345" 
            className="p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value;
                if (val) router.push(`/track?id=${val}`);
              }
            }}
          />
          <button 
            onClick={() => {
              const val = (document.getElementById('order-search') as HTMLInputElement).value;
              if (val) router.push(`/track?id=${val}`);
            }}
            className="bg-blue-600 text-white py-4 rounded-xl font-bold"
          >
            Track Now
          </button>
        </div>
      </div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Order Not Found</h1>
        <p className="text-gray-500">Please check your ID and try again, or contact your laundry provider.</p>
        <a href="/track" className="inline-block mt-6 text-blue-600 hover:underline">Try Another ID</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Order Status</h1>
            <p className="text-gray-500 text-sm">#{orderId.toString().slice(0, 8).toUpperCase()}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {order.status || 'Active'}
          </div>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          <StatusStep label="Order Received" active={['received', 'processing', 'out-for-delivery', 'delivered'].includes(order.status)} />
          <StatusStep label="Washing & Folding" active={['processing', 'out-for-delivery', 'delivered'].includes(order.status)} />
          <StatusStep label="Out for Delivery" active={['out-for-delivery', 'delivered'].includes(order.status)} />
          <StatusStep label="Delivered" active={order.status === 'delivered'} isLast />
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-400">
            Powered by <strong>The Laundry Hive</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

const StatusStep = ({ label, active }: any) => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
    <div className={`flex items-center justify-center w-4 h-4 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${active ? 'bg-blue-600 scale-125 transition-transform duration-500' : 'bg-slate-300'}`}>
    </div>
    <div className={`w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow ml-4 md:ml-0 ${active ? 'bg-white text-blue-900 border-blue-200' : 'bg-gray-50 text-gray-400'}`}>
      <div className={`font-bold ${active ? 'text-blue-600' : ''}`}>{label}</div>
    </div>
  </div>
);

export default function OrderTracking() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading tracker...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
