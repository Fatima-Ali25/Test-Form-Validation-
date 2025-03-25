import Link from 'next/link';
import React from 'react';

export const Header = () => {
  return (
    <header className="bg-[#f1c2f9] shadow-md w-full">
      <div className="container mx-auto max-w-7xl px-6 h-[80px] flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          <Link href="/">FormApp</Link>
        </div>

        {/* Navigation Bar */}
        <nav>
          <ul className="flex items-center space-x-8 text-lg font-semibold">
            <li>
              <Link
                href="/login"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
