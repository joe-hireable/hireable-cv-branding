
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { CircleUser, FileText, Home, Settings, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: Home
    },
    {
      title: "Candidates",
      path: "/candidates",
      icon: Users
    },
    {
      title: "CV Editor",
      path: "/cv-editor",
      icon: FileText
    },
    {
      title: "Profile",
      path: "/profile",
      icon: CircleUser
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="font-bold text-lg">Hireable</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild className={isActive(item.path) ? "text-primary bg-primary/10" : ""}>
                    <Link to={item.path} className="flex gap-2 items-center">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Jane Doe</span>
            <span className="text-xs text-muted-foreground">Senior Recruiter</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-0 top-3 translate-x-1/2" />
    </SidebarComponent>
  );
};
