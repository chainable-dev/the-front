'use client';

import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function ProfilePage() {
    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p>This is the profile page.</p>
            </div>
        </AuthenticatedLayout>
    );
}