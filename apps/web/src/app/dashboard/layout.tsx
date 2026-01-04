'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redundancy check: If user somehow bypasses middleware
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 font-medium">Loading Hive Panel...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-blue-800">The Hive Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded hover:bg-blue-800">📊 Overview</Link>
          <Link href="/dashboard/orders" className="block p-3 rounded hover:bg-blue-800">📦 Active Orders</Link>
          <Link href="/dashboard/drivers" className="block p-3 rounded hover:bg-blue-800">🚚 Driver Fleet</Link>
          <Link href="/dashboard/optimization" className="block p-3 rounded hover:bg-blue-800">📍 Route Optimizer</Link>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={() => auth.signOut().then(() => router.push('/'))} 
            className="w-full text-left p-2 text-red-400 hover:text-red-300"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Control Center</h1>
          <div className="text-sm text-gray-500">Logged in as {user?.email}</div>
        </header>
        {children}
      </main>
    </div>
  );
}
