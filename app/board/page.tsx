'use client';

import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function BoardPage() {
  return (
    <AuthenticatedLayout>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Board</h1>
        {/* Add your board content here */}
        <p>Board content goes here</p>
      </div>
    </AuthenticatedLayout>
  );
}
