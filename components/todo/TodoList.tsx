import React from 'react';
import Todo from './Todo';

interface TodoItem {
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    // Add any other properties that your Todo type should have
}

interface Task {
    // Define the structure of your Task type
}

interface TodoListProps {
    todos: TodoItem[];
    tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, tasks }) => {
    return (
        <div>
            <h2>Todos</h2>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
            ))}
            <h2>Tasks</h2>
            {tasks.map((task, index) => (
                // Render your tasks here
                <div key={index}>{/* Task component or task details */}</div>
            ))}
        </div>
    );
};

export default TodoList;
