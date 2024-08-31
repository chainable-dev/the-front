'use client';

import dynamic from 'next/dynamic'
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout'

const DynamicTaskBoard = dynamic(() => import('@/app/components/TaskBoard'), {
  ssr: false,
  loading: () => <p>Loading TaskBoard...</p>
})

export default function TaskboardPage() {
  return (
    <AuthenticatedLayout>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Taskboard</h1>
        <DynamicTaskBoard />
      </div>
    </AuthenticatedLayout>
  );
}