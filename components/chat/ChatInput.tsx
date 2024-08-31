import React, { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type your message..."
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        </form>
    );
};

export default ChatInput;