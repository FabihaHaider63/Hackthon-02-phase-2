'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      router.replace('/tasks');
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-12 text-center border border-gray-700 backdrop-blur-sm bg-opacity-80">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-6">
          Master Your Day
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The simple, beautiful, and secure way to manage your tasks and stay productive.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Login to Account
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-indigo-400 text-2xl mb-3">✦</div>
            <h3 className="text-lg font-bold text-white mb-2">Beautiful UI</h3>
            <p className="text-gray-500 text-sm">Designed with dark mode first for your focus and comfort.</p>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-indigo-400 text-2xl mb-3">✦</div>
            <h3 className="text-lg font-bold text-white mb-2">JWT Security</h3>
            <p className="text-gray-500 text-sm">Your data is secured with industry-standard encryption.</p>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-indigo-400 text-2xl mb-3">✦</div>
            <h3 className="text-lg font-bold text-white mb-2">Fast & Local</h3>
            <p className="text-gray-500 text-sm">Blazing fast performance with real-time local storage sync.</p>
          </div>
        </div>
      </div>
    </div>
  );
}