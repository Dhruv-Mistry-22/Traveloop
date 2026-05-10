"use client";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Trips</h2>
          <p className="text-gray-600">No trips yet. Create your first trip!</p>
        </div>

        {/* Recommended Destinations */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recommended</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>

        {/* Budget Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          <p className="text-gray-600">$0.00 spent</p>
        </div>
      </div>
    </div>
  );
}
