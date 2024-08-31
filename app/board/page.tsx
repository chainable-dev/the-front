import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function BoardPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Board</h1>
                <p className="text-gray-600 dark:text-gray-300">This is the board page.</p>
            </div>
        </AuthenticatedLayout>
    );
}