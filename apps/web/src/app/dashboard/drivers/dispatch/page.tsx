'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function DriverDispatch() {
  const { user } = useAuth();
  const [stops, setStops] = useState<any[]>([
    { id: '1', address: "123 Maple St", customer: "John Doe", type: "Pickup", status: "Pending" },
    { id: '2', address: "456 Oak Ave", customer: "Jane Smith", type: "Delivery", status: "In Progress" }
  ]);

  // Real-time listener for assigned orders could be added here
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <header className="bg-blue-900 text-white p-6 sticky top-0 z-10 shadow-md">
        <h2 className="text-xl font-bold">Today's Route</h2>
        <p className="text-blue-200 text-sm">2 stops remaining</p>
      </header>

      <div className="p-4 space-y-4">
        {stops.map((stop, i) => (
          <div 
            key={stop.id} 
            className={`p-5 bg-white rounded-2xl shadow-sm border-l-8 transition-all ${
              stop.status === 'In Progress' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                stop.type === 'Pickup' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
              }`}>
                {stop.type}
              </span>
              <span className="text-xs text-gray-400">#{stop.id}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{stop.address}</h3>
            <p className="text-gray-600 text-sm mb-4">{stop.customer}</p>
            
            <div className="flex gap-2">
              {stop.status === 'Pending' ? (
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold active:scale-95 transition">
                  Start Navigation
                </button>
              ) : (
                <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition">
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button for Map Toggle */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl">
        📍
      </button>
    </div>
  );
}
