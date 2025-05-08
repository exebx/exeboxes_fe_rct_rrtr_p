
import { Client, Project, User, Workspace, Task } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Jane Smith",
    email: "jane.smith@techcorp.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=6366f1&color=fff",
  },
  {
    id: "user2",
    name: "John Davis",
    email: "john.davis@techcorp.com",
    role: "developer",
    avatar: "https://ui-avatars.com/api/?name=John+Davis&background=22c55e&color=fff",
  },
  {
    id: "user3",
    name: "Maria Rodriguez",
    email: "maria@acmecorp.com",
    role: "client",
    avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=ef4444&color=fff",
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "client1",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "555-123-4567",
    createdAt: "2023-01-15T00:00:00Z",
    status: "active",
    logo: "https://ui-avatars.com/api/?name=Acme+Corp&background=3b82f6&color=fff&size=128",
  },
  {
    id: "client2",
    name: "Globex Industries",
    email: "info@globex.com",
    phone: "555-987-6543",
    createdAt: "2023-02-22T00:00:00Z",
    status: "active",
    logo: "https://ui-avatars.com/api/?name=Globex&background=8b5cf6&color=fff&size=128",
  },
  {
    id: "client3",
    name: "Stark Enterprises",
    email: "hello@stark.com",
    phone: "555-789-0123",
    createdAt: "2023-03-10T00:00:00Z",
    status: "inactive",
    logo: "https://ui-avatars.com/api/?name=Stark&background=f59e0b&color=fff&size=128",
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "project1",
    clientId: "client1",
    name: "Website Redesign",
    description: "Complete redesign of corporate website with new branding",
    status: "active",
    createdAt: "2023-01-20T00:00:00Z",
    startDate: "2023-02-01T00:00:00Z",
    endDate: "2023-04-30T00:00:00Z"
  },
  {
    id: "project2",
    clientId: "client1",
    name: "Mobile App Development",
    description: "iOS and Android app for customer engagement",
    status: "planning",
    createdAt: "2023-02-05T00:00:00Z",
    startDate: "2023-03-01T00:00:00Z",
  },
  {
    id: "project3",
    clientId: "client2",
    name: "CRM Integration",
    description: "Integration with Salesforce and custom reporting",
    status: "active",
    createdAt: "2023-02-25T00:00:00Z",
    startDate: "2023-03-15T00:00:00Z",
    endDate: "2023-05-30T00:00:00Z"
  },
  {
    id: "project4",
    clientId: "client3",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing",
    status: "on-hold",
    createdAt: "2023-03-15T00:00:00Z",
    startDate: "2023-04-01T00:00:00Z",
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "task1",
    projectId: "project1",
    title: "Design Homepage Mockup",
    description: "Create mockups for the new homepage design",
    status: "completed",
    assignedTo: "user2",
    dueDate: "2023-02-15T00:00:00Z",
    createdAt: "2023-02-05T00:00:00Z"
  },
  {
    id: "task2",
    projectId: "project1",
    title: "Develop Frontend Components",
    description: "Implement React components based on approved designs",
    status: "in-progress",
    assignedTo: "user2",
    dueDate: "2023-03-10T00:00:00Z",
    createdAt: "2023-02-20T00:00:00Z"
  },
  {
    id: "task3",
    projectId: "project1",
    title: "Backend API Integration",
    description: "Connect frontend to new REST APIs",
    status: "todo",
    assignedTo: "user2",
    dueDate: "2023-03-30T00:00:00Z",
    createdAt: "2023-02-25T00:00:00Z"
  },
  {
    id: "task4",
    projectId: "project3",
    title: "Database Schema Design",
    description: "Design database schema for CRM integration",
    status: "completed",
    assignedTo: "user2",
    dueDate: "2023-03-25T00:00:00Z",
    createdAt: "2023-03-15T00:00:00Z"
  }
];

// Mock Workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: "workspace1",
    clientId: "client1",
    projects: mockProjects.filter(project => project.clientId === "client1"),
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "workspace2",
    clientId: "client2",
    projects: mockProjects.filter(project => project.clientId === "client2"),
    members: [mockUsers[0], mockUsers[1]],
    createdAt: "2023-02-22T00:00:00Z"
  },
  {
    id: "workspace3",
    clientId: "client3",
    projects: mockProjects.filter(project => project.clientId === "client3"),
    members: [mockUsers[0]],
    createdAt: "2023-03-10T00:00:00Z"
  }
];

// Helper functions to mimic database operations
export const getClientById = (clientId: string): Client | undefined => {
  return mockClients.find(client => client.id === clientId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return mockProjects.find(project => project.id === projectId);
};

export const getWorkspaceByClientId = (clientId: string): Workspace | undefined => {
  return mockWorkspaces.find(workspace => workspace.clientId === clientId);
};

export const getProjectsByClientId = (clientId: string): Project[] => {
  return mockProjects.filter(project => project.clientId === clientId);
};

export const getTasksByProjectId = (projectId: string): Task[] => {
  return mockTasks.filter(task => task.projectId === projectId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};
