'use client';

import { ThemeProvider } from './contexts/ThemeContext';
import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}