'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import BaseLayout from '@/app/layouts/BaseLayout';
import Image from 'next/image';
import GoogleLogo from '@/components/GoogleLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <BaseLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Login to your account</h3>
          <form onSubmit={handleEmailLogin}>
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot password?</a>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={handleGoogleLogin} 
                className="w-full px-4 py-2 font-bold text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 flex items-center justify-center"
              >
                <GoogleLogo className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </BaseLayout>
  );
}