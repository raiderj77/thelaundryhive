'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackSearch() {
  const [id, setId] = useState('');
  const router = useRouter();

  const handleTrack = () => {
    if (!id.trim()) return;
    // Redirect to the Web App's tracking portal
    const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.thelaundryhive.com';
    router.push(`${DASHBOARD_URL}/track?id=${id.trim()}`);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Track Your Laundry</h2>
        <p className="text-lg text-gray-600 mb-8">
          Enter your unique order ID provided by your local Hive partner to see real-time status updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g. HIVE-12345)" 
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 outline-none transition"
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          />
          <button 
            onClick={handleTrack}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95"
          >
            Track Now
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Can't find your ID? Check your SMS receipt or contact your laundry provider.
        </p>
      </div>
    </div>
  );
}
