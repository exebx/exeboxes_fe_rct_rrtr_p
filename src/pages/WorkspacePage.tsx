
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Folder, 
  Users, 
  Settings as SettingsIcon, 
  FileText, 
  MessageSquare, 
  Calendar 
} from "lucide-react";

const WorkspacePage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { 
    switchWorkspace, 
    currentClient, 
    currentWorkspace, 
    projects,
    isLoading,
    error 
  } = useWorkspace();
  
  // Load the workspace when component mounts
  useEffect(() => {
    if (clientId) {
      switchWorkspace(clientId);
    }
  }, [clientId, switchWorkspace]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-[60vh]">Loading workspace...</div>;
  }
  
  if (error || !currentClient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Workspace Not Found</h2>
        <p className="text-muted-foreground mb-6">
          {error || "The requested workspace could not be found."}
        </p>
        <Button asChild>
          <Link to="/clients">Return to Clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentClient.logo} alt={currentClient.name} />
            <AvatarFallback>{currentClient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{currentClient.name}</h2>
              <Badge variant={currentClient.status === "active" ? "default" : "secondary"}>
                {currentClient.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Workspace created on {new Date(currentClient.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.length === 0 ? (
              <Card className="col-span-full flex flex-col items-center justify-center py-8">
                <Folder className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 text-xl font-semibold">No Projects Yet</h3>
                <p className="mb-6 max-w-md text-center text-muted-foreground">
                  This workspace doesn't have any projects yet. Create your first project to get started.
                </p>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create First Project
                </Button>
              </Card>
            ) : (
              projects.map(project => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge 
                        className="mb-2" 
                        variant={
                          project.status === "active" ? "default" : 
                          project.status === "completed" ? "outline" : 
                          project.status === "planning" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start: {new Date(project.createdAt).toLocaleDateString()}</span>
                      {project.endDate && (
                        <span className="text-muted-foreground">End: {new Date(project.endDate).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button size="sm" variant="outline">Details</Button>
                      <Button size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Team</CardTitle>
              <CardDescription>
                Manage team members who have access to this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentWorkspace?.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between space-x-4 rounded-lg border p-3">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Files</CardTitle>
              <CardDescription>
                Manage documents and files related to this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 text-xl font-semibold">No Files Uploaded</h3>
                <p className="mb-6 max-w-md text-muted-foreground">
                  This workspace doesn't have any files yet. Upload documents, contracts, or other relevant files.
                </p>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>
                Manage preferences and settings for this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Client Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Update client details, contact information, and preferences.
                    </p>
                  </div>
                  <Button variant="outline">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure notification settings for this workspace.
                    </p>
                  </div>
                  <Button variant="outline">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Client Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage client access to this workspace.
                    </p>
                  </div>
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Manage
                  </Button>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4 bg-destructive/5">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">
                      Archive or delete this workspace and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive">
                    Archive Workspace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspacePage;
