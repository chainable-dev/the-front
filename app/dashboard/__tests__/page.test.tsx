import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DashboardPage from '../page';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(),
}));

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => children({ innerRef: null, droppableProps: {} }),
  Draggable: ({ children }) => children({ innerRef: null, draggableProps: {} }),
}));

describe('DashboardPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockSupabase = {
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: { email: 'test@example.com' } }, error: null }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: [
        { id: 1, title: 'Task 1', status: 'TODO' },
        { id: 2, title: 'Task 2', status: 'IN_PROGRESS' },
        { id: 3, title: 'Task 3', status: 'DONE' },
      ],
      error: null,
    }),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase);
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the Task Board title', async () => {
    render(
      <ThemeProvider>
        <DashboardPage />
      </ThemeProvider>
    );

    await waitFor(() => {
      const taskBoardTitle = screen.getByText('Task Board');
      expect(taskBoardTitle).toBeInTheDocument();
    });
  });
});