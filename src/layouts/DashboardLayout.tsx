
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-950">
          <Header />
          <main className="p-4 md:p-6 overflow-auto">
            {children || <Outlet />}
          </main>
          <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Hireable. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
