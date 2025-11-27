import React from "react";
import Navbar from "../../../components/Navbar";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />
            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg text-slate-600">
                    <p>Last updated: November 24, 2025</p>
                    <p>At The Laundry Hive, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                    
                    <h3>1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, subscribe to our service, or communicate with us.</p>
                    
                    <h3>2. How We Use Your Information</h3>
                    <p>We use your information to provide, maintain, and improve our services, process transactions, and send you related information.</p>
                    
                    <h3>3. Data Security</h3>
                    <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>
                    
                    <h3>4. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at privacy@laundryhive.com.</p>
                </div>
            </main>
        </div>
    );
}
