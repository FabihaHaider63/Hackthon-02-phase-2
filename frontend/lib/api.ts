// lib/api.ts
// API client with JWT handling

// Helper function to get JWT token
const getAuthToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
};

// Helper function to decode JWT and get userId (optional, for UI display)
const getUserId = (): string | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// Helper function to add auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const getTasks = async (): Promise<any[]> => {
  if (!getAuthToken()) {
    console.warn("No token found, assuming not logged in");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized, token might be invalid");
        return [];
      }
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getTask = async (id: string): Promise<any> => {
  if (!getAuthToken()) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Failed to fetch task');
  return await response.json();
};

export const createTask = async (data: { title: string; description?: string }): Promise<any> => {
  if (!getAuthToken()) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Failed to create task');
  return await response.json();
};

export const updateTask = async (id: string, data: Partial<{ title: string; description?: string; completed?: boolean }>): Promise<any> => {
  if (!getAuthToken()) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Failed to update task');
  return await response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  if (!getAuthToken()) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Failed to delete task');
};

export const toggleComplete = async (id: string): Promise<any> => {
  if (!getAuthToken()) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Failed to toggle task completion');
  return await response.json();
};