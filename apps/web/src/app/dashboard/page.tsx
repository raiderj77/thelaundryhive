export default function DashboardOverview() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Today's Orders</h3>
        <p className="text-3xl font-bold text-blue-900">0</p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Revenue (30d)</h3>
        <p className="text-3xl font-bold text-green-600">$0.00</p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Active Drivers</h3>
        <p className="text-3xl font-bold text-gray-800">0</p>
      </div>
    </div>
  );
}
