
// Type definitions for client workspace system

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  status: 'active' | 'inactive';
  logo?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  createdAt: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'client';
  avatar?: string;
}

export interface Workspace {
  id: string;
  clientId: string;
  projects: Project[];
  members: User[];
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
}
