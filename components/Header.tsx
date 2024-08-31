'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const Header: React.FC = () => {
  const [initials, setInitials] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserInitials = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('initials')
          .eq('id', user.id)
          .single();
        setInitials(data?.initials || '');
      }
    };
    fetchUserInitials();
  }, [supabase]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
          >
            {initials}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
