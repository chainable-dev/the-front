import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function HomePage() {
    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Welcome to Your App</h1>
                <p>This is the home page.</p>
            </div>
        </AuthenticatedLayout>
    );
}