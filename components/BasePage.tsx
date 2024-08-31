import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

interface BasePageProps {
    title: string;
    children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ title, children }) => {
    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                {children}
            </div>
        </AuthenticatedLayout>
    );
};

export default BasePage;