export default function OptimizationPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">📍 AI Route Optimization</h2>
      <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg mb-8">
        <p className="text-blue-800 font-medium">
          Note: Route optimization requires a "Pro Partner" subscription.
        </p>
      </div>
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-400">Add orders to generate the most efficient delivery routes.</p>
      </div>
    </div>
  );
}
