'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTheme } from '@/contexts/ThemeContext';
import appConfig from '@/config/appConfig';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInitials, setUserInitials] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchUserInitials = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.user_metadata && user.user_metadata.full_name) {
                const fullName = user.user_metadata.full_name;
                const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
                setUserInitials(initials);
            } else {
                setUserInitials('U');
            }
        };

        fetchUserInitials();
    }, [supabase]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        } else {
            router.push('/login');
        }
    };

    return (
        <nav className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        onClick={onMenuClick}
                        className="text-gray-800 dark:text-white focus:outline-none lg:hidden mr-4"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link href="/" className="text-xl font-bold">
                        {appConfig.appName}
                    </Link>
                </div>
                <div className="hidden lg:flex space-x-4">
                    {appConfig.navItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href}
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
                    >
                        {userInitials}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Profile</Link>
                            <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Settings</Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;