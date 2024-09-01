'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const Header: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ initials: string; avatar: string | null }>({ initials: '', avatar: null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('initials')
          .eq('id', user.id)
          .single();
        
        setUserInfo({
          initials: data?.initials || '',
          avatar: user.user_metadata.avatar_url || null
        });
      }
    };
    fetchUserInfo();
  }, [supabase]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    setIsDropdownOpen(false);
  };

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
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center overflow-hidden"
          >
            {userInfo.avatar ? (
              <Image src={userInfo.avatar} alt="User avatar" width={32} height={32} />
            ) : (
              userInfo.initials
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
