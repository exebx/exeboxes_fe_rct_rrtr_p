
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Project, User, Workspace } from '@/types';
import { 
  mockClients, 
  mockProjects, 
  mockUsers, 
  mockWorkspaces,
  getClientById,
  getWorkspaceByClientId
} from '@/data/mockData';

interface WorkspaceContextType {
  currentUser: User | null;
  clients: Client[];
  currentClient: Client | null;
  currentWorkspace: Workspace | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  setCurrentUser: (user: User | null) => void;
  setCurrentClient: (client: Client | null) => void;
  switchWorkspace: (clientId: string) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  getProjectsByClientId: (clientId: string) => Project[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Default to admin user
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to update workspace when client changes
  useEffect(() => {
    if (currentClient) {
      const workspace = getWorkspaceByClientId(currentClient.id);
      setCurrentWorkspace(workspace || null);
      setProjects(mockProjects.filter(project => project.clientId === currentClient.id));
    } else {
      setCurrentWorkspace(null);
      setProjects([]);
    }
  }, [currentClient]);

  // Switch to a different workspace
  const switchWorkspace = (clientId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const client = getClientById(clientId);
      if (client) {
        setCurrentClient(client);
      } else {
        setError(`Client with ID ${clientId} not found`);
      }
    } catch (err) {
      setError('Failed to switch workspace');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new client and create a workspace for them
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate a new client ID
      const newClientId = `client${clients.length + 1}`;
      
      // Create the new client
      const newClient: Client = {
        id: newClientId,
        ...clientData,
        createdAt: new Date().toISOString()
      };
      
      // Create a new workspace for the client
      const newWorkspace: Workspace = {
        id: `workspace${mockWorkspaces.length + 1}`,
        clientId: newClientId,
        projects: [],
        members: [currentUser!], // Add current user as a member
        createdAt: new Date().toISOString()
      };
      
      // Update the state
      setClients(prevClients => [...prevClients, newClient]);
      mockClients.push(newClient);
      mockWorkspaces.push(newWorkspace);
      
      // Switch to the new workspace
      setCurrentClient(newClient);
    } catch (err) {
      setError('Failed to create client');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new project to the current workspace
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentClient) {
        throw new Error('No client selected');
      }
      
      // Generate a new project ID
      const newProjectId = `project${mockProjects.length + 1}`;
      
      // Create the new project
      const newProject: Project = {
        id: newProjectId,
        ...projectData,
        createdAt: new Date().toISOString()
      };
      
      // Update the state
      mockProjects.push(newProject);
      setProjects(prevProjects => [...prevProjects, newProject]);
      
      // Update the workspace
      if (currentWorkspace) {
        currentWorkspace.projects.push(newProject);
      }
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get projects by client ID
  const getProjectsByClientId = (clientId: string): Project[] => {
    return mockProjects.filter(project => project.clientId === clientId);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentUser,
        clients,
        currentClient,
        currentWorkspace,
        projects,
        isLoading,
        error,
        setCurrentUser,
        setCurrentClient,
        switchWorkspace,
        addClient,
        addProject,
        getProjectsByClientId
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
