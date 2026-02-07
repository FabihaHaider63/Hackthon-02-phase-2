// components/TaskCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toggleComplete, deleteTask } from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface TaskCardProps {
  task: Task;
  onDelete?: (taskId: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [success, setSuccess] = useState<string | null>(null);

  const handleToggleComplete = async () => {
    try {
      await toggleComplete(task.id);
      setIsCompleted(!isCompleted);
      setSuccess(isCompleted ? 'Task marked as pending' : 'Task marked as completed');

      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setSuccess('Task deleted successfully');

      // Notify parent component to remove task from state
      if (onDelete) {
        onDelete(task.id);
      }

      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Format the date properly to avoid "Invalid Date" issue
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date unknown';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Date unknown';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-200 hover:bg-gray-700 hover:shadow-2xl ${isCompleted ? 'opacity-80' : ''} border border-gray-700 h-full flex flex-col min-h-[260px]`}>
      {success && (
        <div className="mb-5 p-4 bg-green-900/30 border border-green-700 rounded-xl text-center">
          <p className="text-green-300 text-base">{success}</p>
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-2xl mb-4 ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-gray-300 mb-6 text-lg ${isCompleted ? 'text-gray-500' : 'text-gray-300'}`}>
                {task.description}
              </p>
            )}
          </div>

          <div className="flex space-x-3 ml-4 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`min-h-[50px] min-w-[50px] p-4 rounded-full transition-transform duration-200 hover:scale-105 ${isCompleted
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompleted ? '✓' : '○'}
            </button>

            <Link href={`/tasks/${task.id}`}>
              <button
                className="min-h-[50px] min-w-[50px] p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform duration-200 hover:scale-105"
                aria-label="Edit task"
              >
                ✏
              </button>
            </Link>

            <button
              onClick={handleDelete}
              className="min-h-[50px] min-w-[50px] p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform duration-200 hover:scale-105"
              aria-label="Delete task"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-700 mt-auto">
        <p className="text-base text-gray-400">
          Created: {formatDate(task.createdAt)}
        </p>
      </div>
    </div>
  );
}