import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskColumn from '../TaskColumn';

describe('TaskColumn', () => {
  it('renders the column title and tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
    ];

    render(<TaskColumn title="TODO" tasks={tasks} />);

    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('renders an empty column when no tasks are provided', () => {
    render(<TaskColumn title="DONE" tasks={[]} />);

    expect(screen.getByText('DONE')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});