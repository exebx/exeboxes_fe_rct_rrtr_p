import { Users, FolderKanban, PlusCircle, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { currentUser, clients, currentClient, switchWorkspace } = useWorkspace();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleClientClick = (clientId: string) => {
    switchWorkspace(clientId);
    navigate(`/workspace/${clientId}`);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-sm font-medium">ExE Boxes</span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  data-active={window.location.pathname === '/'}
                  onClick={() => navigate('/')}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className={cn(collapsed ? 'sr-only' : '')}>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  data-active={window.location.pathname === '/clients'}
                  onClick={() => navigate('/clients')}
                >
                  <Users className="h-5 w-5" />
                  <span className={cn(collapsed ? 'sr-only' : '')}>Clients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  data-active={window.location.pathname === '/new-workspace'}
                  onClick={() => navigate('/new-workspace')}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className={cn(collapsed ? 'sr-only' : '')}>New Workspace</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Client Workspaces */}
        {clients.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {clients.map((client) => (
                  <SidebarMenuItem key={client.id}>
                    <SidebarMenuButton 
                      data-active={currentClient?.id === client.id}
                      onClick={() => handleClientClick(client.id)}
                    >
                      <div className="flex items-center justify-center">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={client.logo} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className={cn(collapsed ? 'sr-only' : '')}>{client.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  data-active={window.location.pathname === '/settings'}
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-5 w-5" />
                  <span className={cn(collapsed ? 'sr-only' : '')}>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {currentUser && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex items-center justify-center">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className={cn(collapsed ? 'sr-only' : '')}>{currentUser.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/login')}
                >
                  <LogOut className="h-5 w-5" />
                  <span className={cn(collapsed ? 'sr-only' : '')}>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
