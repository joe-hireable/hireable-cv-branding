
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/navigation/Header';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-950">
        {children || <Outlet />}
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Hireable. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
