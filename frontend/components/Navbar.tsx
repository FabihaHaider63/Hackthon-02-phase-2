'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from './AuthButton';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white h-16 shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold text-white">
            Todo App
          </Link>
          
          {/* Navigation links */}
          <div className="hidden md:flex space-x-6 ml-10">
            <Link 
              href="/tasks" 
              className={`hover:text-gray-300 ${pathname === '/tasks' ? 'text-indigo-400' : ''}`}
            >
              Tasks
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}