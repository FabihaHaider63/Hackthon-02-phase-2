// components/TaskForm.tsx
'use client';

import { useState } from 'react';

interface TaskFormData {
  title: string;
  description: string;
}

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  onSuccess?: (message: string) => void;
}

export default function TaskForm({ 
  initialData = { title: '', description: '' }, 
  onSubmit, 
  onCancel, 
  submitLabel = 'Save',
  onSuccess
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 1 || formData.title.length > 200) {
      newErrors.title = 'Title must be between 1 and 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
      if (onSuccess) {
        onSuccess('Task saved successfully!');
      } else {
        // Default success message if no callback provided
        console.log('Task saved successfully!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-700 text-white rounded-md border ${
            errors.title ? 'border-red-500' : 'border-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 animate-shake">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter task description (optional)"
        />
      </div>
      
      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          className="flex-1 min-h-[40px] bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200 transform hover:scale-105 active:scale-95"
        >
          {submitLabel}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 min-h-[40px] bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}