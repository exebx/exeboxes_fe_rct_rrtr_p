import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { AppLayout } from "@/components/AppLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import ClientsPage from "@/pages/ClientsPage";
import NewWorkspace from "@/pages/NewWorkspace";
import WorkspacePage from "@/pages/WorkspacePage";
import Settings from "@/pages/Settings";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WorkspaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="new-workspace" element={<NewWorkspace />} />
              <Route path="workspace/:clientId" element={<WorkspacePage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
