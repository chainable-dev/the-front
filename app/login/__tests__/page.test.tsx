import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LoginPage from '../page';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
      signInWithOAuth: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
      signInWithOAuth: jest.fn(),
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('renders login form', async () => {
    render(
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );

    // Wait for client-side rendering
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });
  });

  it('handles form submission', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    render(
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );

    // Wait for client-side rendering
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/taskboard');
    });
  });

  it('handles Google sign-in', async () => {
    mockSupabase.auth.signInWithOAuth.mockResolvedValue({ error: null });

    render(
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );

    // Wait for client-side rendering
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign in with Google/i }));

    await waitFor(() => {
      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.any(String),
        },
      });
    });
  });

  it('displays error message on login failure', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });

    render(
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );

    // Wait for client-side rendering
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});