
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/context/WorkspaceContext";
import { mockUsers } from "@/data/mockData";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKanban, LogIn } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate login - in a real app, you would use auth system
    setTimeout(() => {
      // Find a matching user from our mock data
      const user = mockUsers.find(u => u.email === loginData.email);
      
      if (user && loginData.password === "password") { // Simplified for demo
        setCurrentUser(user);
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    
    // Simulate registration - in a real app, you would use auth system
    setTimeout(() => {
      // Auto-login as admin for this demo
      setCurrentUser(mockUsers[0]);
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-4 sm:p-0">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center rounded-lg bg-primary/10 p-2">
              <FolderKanban className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Workspace Nexus</h1>
          <p className="text-muted-foreground">Client Workspace Management Portal</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Sign in to your account to access your workspace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-xs text-primary underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Register for a new account to access your client workspace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Jane Smith"
                      required
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      name="confirmPassword"
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            Demo Account: maria@acmecorp.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
