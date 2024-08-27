import React from 'react';

interface TodoItem {
  id: string;
  user_id: string;
  text: string;
  created_at: string;
  // Add any other properties that your Todo type should have
}

interface TodoProps {
  todo: TodoItem;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <p>{todo.text}</p>
      {/* Render other todo properties as needed */}
    </div>
  );
};

export default Todo;