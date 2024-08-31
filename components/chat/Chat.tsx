'use client';

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

interface ChatHistory {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null);
    const supabase = createClientComponentClient();
    const { theme } = useTheme();

    useEffect(() => {
        const createNewChatHistory = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('chat_histories')
                    .insert({ user_id: user.id, title: 'New Chat' })
                    .select()
                    .single();
                
                if (error) console.error('Error creating chat history:', error);
                else setChatHistory(data);
            }
        };

        createNewChatHistory();
    }, []);

    const handleSend = async () => {
        if (input.trim() && chatHistory) {
            const newMessage: Message = {
                id: Date.now(),
                text: input.trim(),
                sender: 'user',
            };
            setMessages([...messages, newMessage]);
            setInput('');

            // TODO: Add AI response logic here

            // Update chat history
            const { error } = await supabase
                .from('chat_histories')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', chatHistory.id);

            if (error) console.error('Error updating chat history:', error);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-gray-800">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`max-w-3/4 p-3 rounded-lg ${
                            message.sender === 'user'
                                ? 'bg-blue-500 text-white self-end'
                                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}