'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            router.replace('/tasks');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('auth-token', data.token);

            // Redirect using router.push for smoother SPA experience
            router.push('/tasks');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login to Todo App</h2>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <p>
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
