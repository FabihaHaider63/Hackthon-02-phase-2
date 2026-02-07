'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      setIsLoggedIn(!!token);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    // Force reload to clear any auth state in other components
    window.location.href = '/';
  };

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}