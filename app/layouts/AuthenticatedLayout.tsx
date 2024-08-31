import React from 'react';
import { Header } from '@/components/Header';
import SideNav from '@/components/SideNav';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <SideNav />
        <main className="flex-grow p-8">{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;