'use client';

import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function SettingsPage() {
  return (
    <AuthenticatedLayout>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
        {/* Add your settings content here */}
      </div>
    </AuthenticatedLayout>
  );
}
