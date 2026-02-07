// app/tasks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskCard from '@/components/TaskCard';
import { getTasks } from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    // Auth guard
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await getTasks();
        setTasks(tasksData);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleDeleteTask = (taskId: string) => {
    // Remove the deleted task from state immediately
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setSuccess('Task deleted successfully');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-300">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-700 rounded-md p-4 text-center">
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {success && (
        <div className="mb-6 p-3 bg-green-900/30 border border-green-700 rounded-lg text-center">
          <p className="text-green-300">{success}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Your Tasks</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
            className="bg-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[150px]"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <Link href="/tasks/new">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap font-medium">
              + New Task
            </button>
          </Link>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No tasks found</p>
          <p className="text-gray-500 mt-2">
            {filter === 'all'
              ? "Get started by creating your first task!"
              : `You have no ${filter} tasks.`}
          </p>
          {filter !== 'all' && (
            <Link href="/tasks" className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block">
              View all tasks
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}
    </div>
  );
}