import React from "react";
import Navbar from "../../components/Navbar";

export default function FAQPage() {
    const faqs = [
        {
            q: "Do I need to install software on my computer?",
            a: "No! The Laundry Hive is 100% cloud-based. You can access your dashboard from any computer, tablet, or phone with an internet connection."
        },
        {
            q: "How does the driver app work?",
            a: "Your drivers download our dedicated app. When you assign orders, they get optimized routes instantly. They can capture proof of delivery photos and signatures right from the app."
        },
        {
            q: "Can I use my own domain name?",
            a: "Yes! On the Empire plan, we offer full white-labeling, meaning the customer app and booking page live on your own domain (e.g., wash.yourlaundry.com)."
        },
        {
            q: "How do I get paid?",
            a: "We integrate directly with Stripe. Payments are deposited into your bank account daily. We support credit cards, Apple Pay, and Google Pay."
        },
        {
            q: "Is there a contract?",
            a: "No contracts. You can cancel anytime. We believe you should stay because you love the product, not because you're locked in."
        }
    ];

    return (
        <div className="min-h-screen bg-hive-wax font-sans">
            <Navbar />
            
            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-hive-black mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-slate-600">
                        Have questions? We've got answers.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-hive-black mb-3">{faq.q}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
