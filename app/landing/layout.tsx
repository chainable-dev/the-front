'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { SessionProvider } from 'next-auth/react';
import '../globals.css';
import ChatbotModal from "@/components/ChatbotModal";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GeistProvider>
            <CssBaseline />
            <ThemeProvider>
              <LayoutContent>
                {children}
              </LayoutContent>
            </ThemeProvider>
          </GeistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [lastShiftPress, setLastShiftPress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Shift') {
        const now = Date.now();
        if (now - lastShiftPress < 500) {  // 500ms threshold for double press
          setIsChatbotOpen(true);
        }
        setLastShiftPress(now);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [lastShiftPress]);

  return (
    <>
      {children}
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
}
