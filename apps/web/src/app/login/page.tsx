'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // In a real app, you'd set a 'session-token' cookie here via an API route
      // or using a client-side cookie library so the middleware can see it.
      // For this demo, we'll simulate the successful auth redirect.
      router.push(callbackUrl);
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to The Hive</h2>
        <input 
          type="email" 
          placeholder="Email" 
          required
          className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          className="w-full p-3 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Sign In
        </button>
        <p className="mt-4 text-center text-sm">
          New here? <a href="/sign-up" className="text-blue-600">Create a business account</a>
        </p>
      </form>
    </div>
  );
}
