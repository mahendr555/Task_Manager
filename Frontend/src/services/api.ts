import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // Create a new task
  createTask: async (title: string, description: string): Promise<Task> => {
    const response = await api.post<Task>('/tasks', { title, description, isCompleted: false });
    return response.data;
  },

  // Toggle task completion
  toggleTask: async (id: number): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
