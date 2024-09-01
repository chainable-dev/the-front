import React from 'react';
import Link from 'next/link';
import { Board } from '@/types';

interface BoardListProps {
  boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  return (
    <ul className="space-y-4">
      {boards.map((board) => (
        <li key={board.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <Link href={`/boards/${board.id}`}>
            <h2 className="text-xl font-semibold mb-2">{board.title}</h2>
          </Link>
          {board.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">{board.description}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(board.created_at).toLocaleDateString()}
          </p>
          {board.user_id && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              User ID: {board.user_id}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BoardList;