'use client';

import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext';
import { ThemeProvider } from '../contexts/ThemeContext';

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  comments: number
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: 2 },
      { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: 0 },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: 5 },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: 1 },
    ],
  },
]

const TaskCard: React.FC<{ task: Task; columnId: string }> = ({ task, columnId }) => {
  const { theme, isDark } = useTheme();
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getCardClasses = () => {
    return isDark
      ? 'bg-gray-700 text-gray-100 shadow-md shadow-black/20'
      : 'bg-white text-gray-900 shadow-md';
  };

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className={`mb-3 cursor-move ${getCardClasses()} hover:shadow-lg transition-shadow duration-200`}>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} mb-2`}>{task.description}</p>
          <div className="flex justify-between items-center">
            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
              {task.priority}
            </Badge>
            <div className="flex items-center space-x-2">
              {task.dueDate && (
                <div className={`flex items-center text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>
                  <Calendar className="w-3 h-3 mr-1" />
                  {task.dueDate}
                </div>
              )}
              {task.comments > 0 && (
                <div className={`flex items-center text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {task.comments}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Column: React.FC<{ column: Column; moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void }> = ({ column, moveTask }) => {
  const { isDark } = useTheme();
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id);
      }
    },
  });

  const getColumnClasses = () => {
    return isDark
      ? 'bg-gray-800 text-gray-100'
      : 'bg-gray-100 text-gray-900';
  };

  return (
    <div ref={drop} className={`${getColumnClasses()} p-4 rounded-lg w-80 flex-shrink-0`}>
      <h3 className="font-bold mb-4 flex justify-between items-center">
        {column.title}
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </h3>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} />
        ))}
      </ScrollArea>
      <Button variant="secondary" className="w-full mt-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add a card
      </Button>
    </div>
  );
};

export default function BoardPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const { getThemeClasses } = useTheme();

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({ ...column, tasks: [...column.tasks] }))
      const sourceColumn = newColumns.find((col) => col.id === sourceColumnId)
      const targetColumn = newColumns.find((col) => col.id === targetColumnId)
      const taskToMove = sourceColumn?.tasks.find((task) => task.id === taskId)

      if (sourceColumn && targetColumn && taskToMove) {
        sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== taskId)
        targetColumn.tasks.push(taskToMove)
      }

      return newColumns
    })
  }

  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <div className={`min-h-screen p-6 ${getThemeClasses()}`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Project Board</h1>
            <div className="flex space-x-2">
              <Input placeholder="Search tasks..." className="w-64" />
              <Button>Filter</Button>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <Column key={column.id} column={column} moveTask={moveTask} />
            ))}
            <Button variant="secondary" className="h-[calc(100vh-160px)] w-80 flex-shrink-0">
              <PlusCircle className="mr-2 h-4 w-4" /> Add another list
            </Button>
          </div>
        </div>
      </DndProvider>
    </ThemeProvider>
  )
}
