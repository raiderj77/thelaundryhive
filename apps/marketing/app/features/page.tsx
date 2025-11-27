import React from "react";
import Navbar from "../../components/Navbar";
import { Truck, Smartphone, LayoutDashboard, Zap, Map, CreditCard } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            icon: <Smartphone size={32} className="text-hive-gold" />,
            title: "Customer PWA",
            description: "A beautiful, branded mobile app for your customers to schedule pickups, track orders, and pay seamlessly. No app store download required."
        },
        {
            icon: <Truck size={32} className="text-hive-gold" />,
            title: "Smart Logistics",
            description: "Optimize driver routes automatically. Save fuel and time with AI-powered routing and real-time driver tracking."
        },
        {
            icon: <LayoutDashboard size={32} className="text-hive-gold" />,
            title: "Operator Dashboard",
            description: "Manage your entire business from one screen. Track machines, orders, employees, and revenue in real-time."
        },
        {
            icon: <CreditCard size={32} className="text-hive-gold" />,
            title: "Automated Billing",
            description: "Secure payments via Stripe. Handle subscriptions, per-pound pricing, and delivery fees automatically."
        },
        {
            icon: <Map size={32} className="text-hive-gold" />,
            title: "Live Tracking",
            description: "Give customers peace of mind with Uber-style live tracking for their laundry pickup and delivery."
        },
        {
            icon: <Zap size={32} className="text-hive-gold" />,
            title: "Instant Notifications",
            description: "Keep customers in the loop with SMS and push notifications at every step of the cleaning process."
        }
    ];

    return (
        <div className="min-h-screen bg-hive-wax font-sans">
            <Navbar />
            
            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-hive-black mb-6">
                        Everything You Need to Run a Modern Laundromat
                    </h1>
                    <p className="text-xl text-slate-600">
                        Replace your clipboard and spreadsheets with a powerful operating system designed for growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border border-slate-100 group">
                            <div className="bg-hive-wax w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-hive-black mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 bg-hive-black rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-hive-gold/10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to modernize your business?</h2>
                        <button className="bg-hive-gold text-hive-black px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition shadow-lg shadow-hive-gold/20">
                            Start Your Free Trial
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
