import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {children}
    </div>
  );
};

export default BaseLayout;