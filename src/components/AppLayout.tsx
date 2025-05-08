import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:px-6">
            <SidebarTrigger />
            <MainHeader />
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function MainHeader() {
  const { currentClient, currentWorkspace } = useWorkspace();
  
  return (
    <div className="ml-4 flex flex-1 items-center justify-between">
      <div>
        {currentClient ? (
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{currentClient.name}</h1>
            <p className="text-sm text-muted-foreground">
              {currentWorkspace?.projects.length || 0} Projects
            </p>
          </div>
        ) : (
          <h1 className="text-lg font-semibold">ExE Boxes Portal</h1>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Placeholder for notifications, profile, etc. */}
      </div>
    </div>
  );
}
