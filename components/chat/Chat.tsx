import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);

    const handleSendMessage = async (message: string) => {
        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: message }]);

        // Send message to API and get response
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();

            // Add AI response to chat
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="flex flex-col h-full">
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chat;