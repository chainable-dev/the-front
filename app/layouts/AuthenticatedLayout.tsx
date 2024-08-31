import React from 'react';
import Sidebar from '@/components/Sidebar';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64">{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
