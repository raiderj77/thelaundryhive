import Link from 'next/link';

export default function HomePage() {
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.thelaundryhive.com';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Laundry Management <br />
          <span className="text-blue-300">Without the Middleman</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
          Keep 100% of your revenue. No commissions. Just a flat $49/month for the tools 
          you need to dominate your local market.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={`${DASHBOARD_URL}/sign-up`}
            className="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-xl"
          >
            Start Your Free Trial
          </a >
          <Link 
            href="/track"
            className="bg-blue-800 text-white border-2 border-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
          >
            Track an Order
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white flex flex-wrap justify-center gap-12 grayscale opacity-50 px-6">
        <span className="text-2xl font-black italic">CLOUDWASH</span>
        <span className="text-2xl font-black italic">SPARKLE</span>
        <span className="text-2xl font-black italic">URBAN CLEAN</span>
        <span className="text-2xl font-black italic">FASTFOLD</span>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="text-4xl mb-4 text-blue-600">📍</div>
          <h3 className="text-xl font-bold mb-4">Route Optimization</h3>
          <p className="text-gray-600">Reduce fuel costs and driver burnout with automated, sequential delivery routes.</p>
        </div>
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="text-4xl mb-4 text-blue-600">📱</div>
          <h3 className="text-xl font-bold mb-4">Real-Time Tracking</h3>
          <p className="text-gray-600">Give your customers the "Uber" experience with live updates from pickup to delivery.</p>
        </div>
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="text-4xl mb-4 text-blue-600">💰</div>
          <h3 className="text-xl font-bold mb-4">Zero Commissions</h3>
          <p className="text-gray-600">Stop giving 20% to aggregators. Pay one flat fee and keep all your profit.</p>
        </div>
      </section>
    </main>
  );
}
