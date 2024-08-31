import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import Chat from "@/components/chat/Chat";

export default function ChatPage() {
    return (
        <AuthenticatedLayout>
            <div className="h-full flex flex-col">
                <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
                <div className="flex-grow">
                    <Chat />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
