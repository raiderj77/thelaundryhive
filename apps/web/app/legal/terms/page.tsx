import React from "react";

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto p-8 text-slate-800">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4 text-sm text-slate-500">Last Updated: November 23, 2025</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">1. Agreement to Terms</h2>
                <p className="mb-2">By accessing or using The Laundry Hive, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">2. Use of Service</h2>
                <p className="mb-2">You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">3. Payments</h2>
                <p className="mb-2">All payments are processed securely via Stripe. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the service.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">4. Limitation of Liability</h2>
                <p className="mb-2">In no event shall The Laundry Hive, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">5. Termination</h2>
                <p className="mb-2">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">6. Changes</h2>
                <p className="mb-2">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at: legal@thelaundryhive.com</p>
            </section>
        </div>
    );
}
