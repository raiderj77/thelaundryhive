'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bizName, setBizName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create "Laundromat" profile in Firestore
      // This officially enables the "Business Owner" role functionality.
      await setDoc(doc(db, "tenants", user.uid), {
        name: bizName,
        ownerEmail: email,
        plan: 'trial',
        createdAt: new Date().toISOString(),
      });

      // 3. Create User record with role
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: 'owner',
        tenantId: user.uid
      });

      router.push('/dashboard');
    } catch (error: any) {
      alert("Sign up failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignUp} className="p-8 bg-white shadow-xl rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Start Your Free Trial</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Launch your laundry pickup & delivery business in minutes.
        </p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Business Name (e.g., Sunshine Laundry)" 
            required
            className="w-full p-3 border rounded"
            onChange={(e) => setBizName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Work Email" 
            required
            className="w-full p-3 border rounded"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full p-3 border rounded"
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-3 mt-6 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Creating Account...' : 'Get Started for Free'}
        </button>
        
        <p className="mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Sign In</a>
        </p>
      </form>
    </div>
  );
}
