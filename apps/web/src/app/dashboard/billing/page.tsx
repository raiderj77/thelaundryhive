'use client';
import { useAuth } from '@/context/AuthContext';
import { stripePromise } from '@/lib/stripe';

export default function BillingPage() {
  const { user } = useAuth();

  const handleSubscribe = async () => {
    try {
      // 1. In a real app, this would be a dynamic Price ID from Stripe
      const priceId = 'price_123_test'; 
      
      // 2. Call your API to create a Stripe Checkout Session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId, 
          email: user?.email 
        }),
      });

      const session = await response.json();

      // 3. Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await (stripe as any).redirectToCheckout({
          sessionId: session.id,
        });
        if (error) console.error(error);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Could not initiate subscription. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Activate Your Hive</h1>
      <p className="text-gray-600 mb-8">
        Unlock unlimited orders, driver tracking, and route optimization for a flat 
        <span className="text-blue-600 font-bold"> $49/month</span>.
      </p>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500">
        <h3 className="text-xl font-bold mb-2">Pro Partner Plan</h3>
        <ul className="text-left space-y-3 mb-8">
          <li>✅ 0% Commission on all orders</li>
          <li>✅ Real-time Driver Tracking</li>
          <li>✅ AI Route Optimization</li>
          <li>✅ Priority Customer Support</li>
        </ul>
        <button 
          onClick={handleSubscribe}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          Start Your Subscription
        </button>
      </div>
      <p className="text-sm text-gray-400 mt-6">
        Secure payment processing by Stripe. Cancel anytime.
      </p>
    </div>
  );
}
