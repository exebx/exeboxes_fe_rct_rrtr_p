
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Lock, 
  BellRing, 
  Palette, 
  HelpCircle, 
  Database, 
  Shield 
} from "lucide-react";

const Settings = () => {
  const { currentUser } = useWorkspace();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and system preferences.
        </p>
      </div>
      
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details and profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage 
                    src={currentUser?.avatar}
                    alt={currentUser?.name || "User avatar"} 
                  />
                  <AvatarFallback>{currentUser?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Picture
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. 2MB max.
                  </p>
                </div>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={currentUser?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={currentUser?.email || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={currentUser?.role || ""} 
                    readOnly
                    disabled
                  />
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="border-2 border-primary">
                    Light
                  </Button>
                  <Button variant="outline">Dark</Button>
                  <Button variant="outline">System</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="densityToggle">Compact Mode</Label>
                  <Switch id="densityToggle" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Reduce padding and spacing for a more compact view.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animationsToggle">Interface Animations</Label>
                  <Switch id="animationsToggle" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable interface animations and transitions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="newMemberToggle">New Team Members</Label>
                    </div>
                    <Switch id="newMemberToggle" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notify when new members are added to workspaces.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellRing className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="projectUpdatesToggle">Project Updates</Label>
                    </div>
                    <Switch id="projectUpdatesToggle" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notify about updates to projects you're assigned to.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="supportToggle">Support Messages</Label>
                    </div>
                    <Switch id="supportToggle" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about support and help requests.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Update Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security and authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button className="mt-4">Update Password</Button>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System</CardTitle>
              <CardDescription>
                Manage system-wide settings and configurations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="analyticsToggle">Usage Analytics</Label>
                  <Switch id="analyticsToggle" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Help improve the system by sharing anonymous usage data.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="backupToggle">Automatic Backups</Label>
                  <Switch id="backupToggle" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable automatic daily backups of your workspace data.
                </p>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium">Data Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your data or clear cache files.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    Clear Cache
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

export default Settings;
