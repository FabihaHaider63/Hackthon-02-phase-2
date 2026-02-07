// app/tasks/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskForm from '@/components/TaskForm';
import { getTask, updateTask, deleteTask, toggleComplete } from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const taskData = await getTask(taskId);
        setTask(taskData);
        setError(null);
      } catch (err) {
        setError('Failed to load task. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async (formData: { title: string; description: string }) => {
    try {
      const updatedTask = await updateTask(taskId, formData);
      setTask(updatedTask);
      setIsEditing(false);
      setSuccess('Task updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setSuccess('Task deleted successfully!');
        
        // Redirect after showing success message
        setTimeout(() => {
          router.push('/tasks');
        }, 1500);
      } catch (err) {
        setError('Failed to delete task. Please try again.');
        console.error(err);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await toggleComplete(taskId);
      setTask(updatedTask);
      setSuccess(updatedTask.completed ? 'Task marked as completed!' : 'Task marked as pending!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-300">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-700 rounded-md p-4 text-center">
          <p className="text-red-300">{error}</p>
          <Link href="/tasks" className="mt-3 inline-block bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md">
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-400">Task not found</p>
        <Link href="/tasks" className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {success && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-md text-center">
          <p className="text-green-300">{success}</p>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-white">Task Details</h1>
        <Link href="/tasks" className="text-indigo-400 hover:text-indigo-300">
          ← Back to Tasks
        </Link>
      </div>

      {isEditing ? (
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Edit Task</h2>
          <TaskForm
            initialData={{ title: task.title, description: task.description || '' }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Update Task"
            onSuccess={(msg) => setSuccess(msg)}
          />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleToggleComplete}
                className={`p-2 rounded-full ${
                  task.completed 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed ? '✓' : '○'}
              </button>
            </div>
          </div>
          
          {task.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
              <p className="text-gray-300">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Status</h3>
              <p className={`font-medium ${task.completed ? 'text-green-400' : 'text-yellow-400'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Created</h3>
              <p className="text-gray-300">{new Date(task.createdAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Edit Task
            </button>
            
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}