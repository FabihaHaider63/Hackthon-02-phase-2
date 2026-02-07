// app/tasks/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskForm from '@/components/TaskForm';
import { createTask } from '@/lib/api';

export default function NewTaskPage() {
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: { title: string; description: string }) => {
    try {
      setError(null);
      await createTask(formData);
      setSuccess('Task created successfully!');
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/tasks');
      }, 1500);
    } catch (error) {
      setError('Failed to create task. Please try again.');
      console.error('Failed to create task:', error);
    }
  };

  const handleSuccess = (message: string) => {
    setSuccess(message);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Task</h1>
        <Link href="/tasks" className="text-indigo-400 hover:text-indigo-300">
          ← Back to Tasks
        </Link>
      </div>

      {(success || error) && (
        <div className={`mb-4 p-3 rounded-md text-center ${
          success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'
        }`}>
          <p className={success ? 'text-green-300' : 'text-red-300'}>
            {success || error}
          </p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <TaskForm 
          onSubmit={handleSubmit} 
          submitLabel="Create Task"
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}