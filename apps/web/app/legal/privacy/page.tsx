import React from "react";

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-8 text-slate-800">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4 text-sm text-slate-500">Last Updated: November 23, 2025</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
                <p className="mb-2">Welcome to The Laundry Hive ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Progressive Web Application (PWA) and services.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, and physical address provided during registration or order placement.</li>
                    <li><strong>Payment Data:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number. All payment data is stored by Stripe.</li>
                    <li><strong>Usage Data:</strong> Information automatically collected when you use the app, including IP address, device type, and operating system.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">We use your information to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Facilitate account creation and logon process.</li>
                    <li>Fulfill and manage your orders.</li>
                    <li>Send you administrative information and order updates (via Email/SMS).</li>
                    <li>Protect our services and prevent fraud.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">4. Sharing Your Information</h2>
                <p className="mb-2">We may share information with:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Service Providers:</strong> Third-party vendors like Stripe (payments), AWS (email), and Twilio (SMS).</li>
                    <li><strong>Legal Obligations:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">5. Your Privacy Rights (GDPR & CCPA)</h2>
                <p className="mb-2">Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Request access to the personal data we hold about you.</li>
                    <li>Request correction or deletion of your personal data.</li>
                    <li>Opt-out of marketing communications.</li>
                </ul>
                <p className="mt-2">To exercise these rights, please contact us or use the "Data Privacy" section in your account settings.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">6. Contact Us</h2>
                <p>If you have questions about this policy, please contact us at: privacy@thelaundryhive.com</p>
            </section>
        </div>
    );
}
