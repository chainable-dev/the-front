'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '@/app/hooks/useUser';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user: userFromHook, logout } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('full_name, initials')
          .eq('id', user.id)
          .single();
        setUser({ ...user, ...userData });
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'} p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="mr-4 text-white focus:outline-none"
            >
              ☰
            </button>
            <Link href="/taskboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded mr-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500'}`}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            {userFromHook && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <span className="text-sm font-medium">{getInitials(userFromHook.name)}</span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userFromHook.email}</p>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block w-full text-left px-4 py-2 text-sm`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </header>
      
      {/* Left Navigation Bar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-4 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
        <button
          onClick={() => setIsNavOpen(false)}
          className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          ✕
        </button>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link href="/boards" className={`block py-2 px-4 rounded ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'}`}>
                Boards
              </Link>
            </li>
            <li>
              <Link href="/members" className={`block py-2 px-4 rounded ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'}`}>
                Members
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Overlay to close nav when clicking outside */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </>
  );
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default Header;