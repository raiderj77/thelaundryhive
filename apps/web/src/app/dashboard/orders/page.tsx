export default function OrdersPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">Active Orders</h2>
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-400">No active orders yet. Your customer orders will appear here.</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
          Create Manual Order
        </button>
      </div>
    </div>
  );
}
