import React from "react";
import Navbar from "../../../components/Navbar";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />
            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-lg text-slate-600">
                    <p>Last updated: November 24, 2025</p>
                    <p>Please read these Terms of Service carefully before using The Laundry Hive platform.</p>
                    
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
                    
                    <h3>2. Use License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on The Laundry Hive's website for personal, non-commercial transitory viewing only.</p>
                    
                    <h3>3. Disclaimer</h3>
                    <p>The materials on The Laundry Hive's website are provided on an 'as is' basis. The Laundry Hive makes no warranties, expressed or implied.</p>
                    
                    <h3>4. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State.</p>
                </div>
            </main>
        </div>
    );
}
