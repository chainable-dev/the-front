'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, supabase]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="flex-grow p-4 lg:ml-64 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
