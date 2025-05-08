
import { useWorkspace } from "@/context/WorkspaceContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FolderKanban, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { clients, projects } = useWorkspace();
  
  // Count active projects
  const activeProjects = projects.filter(p => p.status === 'active').length;
  
  // Count projects by status
  const projectsByStatus = {
    planning: projects.filter(p => p.status === 'planning').length,
    active: activeProjects,
    'on-hold': projects.filter(p => p.status === 'on-hold').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your client workspace management portal.
          </p>
        </div>
        <Button asChild>
          <Link to="/new-workspace">Create New Workspace</Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              Active client workspaces
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all workspaces
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsByStatus.completed}</div>
            <p className="text-xs text-muted-foreground">
              Finished projects
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Client Activity</CardTitle>
            <CardDescription>
              Monitor the latest updates across your client workspaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.length === 0 ? (
                <p className="text-center text-muted-foreground">No clients yet. Create your first workspace!</p>
              ) : (
                clients.map(client => (
                  <div key={client.id} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-semibold text-primary">{client.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {projects.filter(p => p.clientId === client.id).length} Projects
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/workspace/${client.id}`}>View</Link>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>
              Current status of all projects across workspaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Planning</p>
                    <p className="text-sm font-medium">{projectsByStatus.planning}</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-blue-500" 
                      style={{ width: `${(projectsByStatus.planning / Math.max(projects.length, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Active</p>
                    <p className="text-sm font-medium">{projectsByStatus.active}</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: `${(projectsByStatus.active / Math.max(projects.length, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">On Hold</p>
                    <p className="text-sm font-medium">{projectsByStatus["on-hold"]}</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-yellow-500" 
                      style={{ width: `${(projectsByStatus["on-hold"] / Math.max(projects.length, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Completed</p>
                    <p className="text-sm font-medium">{projectsByStatus.completed}</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-purple-500" 
                      style={{ width: `${(projectsByStatus.completed / Math.max(projects.length, 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
