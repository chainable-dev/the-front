'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@vercel/ai';
import { Modal, Input, Button, Text, Loading } from '@geist-ui/core';
import { useSession, signIn, signOut } from 'next-auth/react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const { data: session, status } = useSession();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await handleSubmit(e);
    } catch (err) {
      setError('An error occurred while sending the message. Please try again.');
    }
  };

  if (status === 'loading') {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Modal open={isOpen} onClose={onClose} width="35rem">
      <Modal.Title>Chatbot</Modal.Title>
      <Modal.Content>
        {session ? (
          <>
            <div style={{ height: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
              {messages.map((message, index) => (
                <div key={index} style={{ marginBottom: '0.5rem', textAlign: message.role === 'user' ? 'right' : 'left' }}>
                  <Text small b>{message.role === 'user' ? 'You' : 'Bot'}:</Text>
                  <Text small>{message.content}</Text>
                </div>
              ))}
            </div>
            <form onSubmit={handleFormSubmit}>
              <Input 
                width="100%" 
                value={input} 
                onChange={(e) => handleInputChange(e as any)} 
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="success" htmlType="submit" style={{ marginTop: '1rem' }} loading={isLoading}>Send</Button>
            </form>
            {error && <Text type="error">{error}</Text>}
            <Button onClick={() => signOut()} style={{ marginTop: '1rem' }}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => signIn('google')}>Sign In with Google</Button>
        )}
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>Close</Modal.Action>
    </Modal>
  );
}