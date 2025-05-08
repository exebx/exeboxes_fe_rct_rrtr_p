
import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { MoreHorizontal, Search, Plus, FolderKanban } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ClientsPage = () => {
  const { clients, switchWorkspace } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Manage all your client workspaces from one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/new-workspace">
            <Plus className="mr-2 h-4 w-4" />
            New Client
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
          <CardDescription>
            View and manage all your clients and their workspaces.
          </CardDescription>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="h-9 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FolderKanban className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-xl font-semibold">No Clients Found</h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                {clients.length === 0
                  ? "You haven't created any client workspaces yet. Start by adding your first client."
                  : "No clients match your search criteria. Try a different search term."}
              </p>
              {clients.length === 0 && (
                <Button asChild>
                  <Link to="/new-workspace">Create First Client</Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={client.logo} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.status === "active" ? "default" : "secondary"}>
                        {client.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {/* Get projects count for this client from context */}
                      {useWorkspace().getProjectsByClientId(client.id).length} Projects
                    </TableCell>
                    <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/workspace/${client.id}`}>View Workspace</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
