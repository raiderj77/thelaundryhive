'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminGodView() {
  const { user, loading } = useAuth();
  
  /**
   * Hardcoded Admin UID check. 
   * In a production environment, you should use Firebase Custom Claims 
   * (via Admin SDK) to set 'admin: true' on the user token.
   */
  const ADMIN_UID = "your-master-uid-here"; 

  if (loading) return <div className="p-10 text-center text-gray-400">Verifying Authority...</div>;

  if (user?.uid !== ADMIN_UID) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-black text-red-600 mb-4">403</h1>
          <p className="text-xl text-gray-400 mb-8">Access Denied: Hive Command Center is restricted.</p>
          <Link href="/" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-yellow-500">Hive Command Center</h1>
          <p className="text-gray-400">Platform-wide Monitoring & Oversight</p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700">
          <span className="text-green-500">●</span> System Status: Optimal
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Partners" value="24" color="bg-blue-600" />
        <StatCard title="Total Orders" value="1,204" color="bg-green-600" />
        <StatCard title="Monthly Revenue" value="$1,176" color="bg-purple-600" />
      </div>

      <div className="mt-12 bg-gray-800 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
          <span>Recent Partner Signups</span>
          <button className="text-sm text-blue-400 hover:text-blue-300">View All Partners →</button>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 uppercase text-xs border-b border-gray-700">
                <th className="pb-4">Business Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Plan Status</th>
                <th className="pb-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <SignupRow name="Sunshine Laundry" email="owner@sunshine.com" status="Paid" date="2h ago" />
              <SignupRow name="QuickFold Services" email="hello@quickfold.io" status="Trial" date="5h ago" />
              <SignupRow name="City Wash & Dry" email="admin@citywash.net" status="Paid" date="1d ago" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, color }: any) => (
  <div className={`${color} p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform cursor-pointer`}>
    <p className="text-sm uppercase font-bold opacity-80 mb-2">{title}</p>
    <p className="text-4xl font-black">{value}</p>
  </div>
);

const SignupRow = ({ name, email, status, date }: any) => (
  <tr className="hover:bg-gray-750 transition">
    <td className="py-4 font-bold">{name}</td>
    <td className="py-4 text-gray-400">{email}</td>
    <td className="py-4">
      <span className={`px-2 py-1 rounded text-xs font-bold ${status === 'Paid' ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}`}>
        {status}
      </span>
    </td>
    <td className="py-4 text-sm text-gray-500">{date}</td>
  </tr>
);
