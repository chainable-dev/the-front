import React from 'react';

interface Message {
    role: string;
    content: string;
}

interface ChatMessagesProps {
    messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;