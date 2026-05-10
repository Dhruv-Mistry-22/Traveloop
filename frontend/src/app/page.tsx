"use client";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          ✈️ TravelLoop
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your personalized travel planning platform. Plan trips, manage budgets, and share itineraries.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/auth/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            href="/auth/signup"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
}
