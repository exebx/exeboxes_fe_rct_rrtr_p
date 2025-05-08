
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/context/WorkspaceContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus } from "lucide-react";

const NewWorkspace = () => {
  const { addClient } = useWorkspace();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create new client and workspace
      addClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: 'active',
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=6366f1&color=fff&size=128`
      });
      
      // Success! Redirect to the dashboard
      navigate("/clients");
    } catch (error) {
      console.error("Failed to create workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Workspace</h2>
        <p className="text-muted-foreground">
          Set up a new client workspace to manage projects and collaboration.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>
              Enter the client details for the new workspace.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Acme Corporation" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="contact@example.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="(123) 456-7890" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Workspace Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Brief description of the client and their needs..." 
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" onClick={() => navigate("/clients")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Create Workspace
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="hidden space-y-4 md:block">
          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
              <CardDescription>
                After creating a new client workspace:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Workspace Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    A dedicated workspace for this client will be created instantly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Add Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    You can start adding projects to the client's workspace.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Invite Team Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Invite your team members to collaborate in the workspace.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Client Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide access to the client for their dedicated workspace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewWorkspace;
