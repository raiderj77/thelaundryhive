export default function DriversPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">Driver Fleet</h2>
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-400">No drivers connected. Drivers can download the "Hive Driver" app to sync.</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
          Invite Driver
        </button>
      </div>
    </div>
  );
}
