import React from 'react';
import { Sidebar, TopNavbar } from '@/components/dashboard';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full">
      <Sidebar />
      <div className="w-full flex-1 overflow-y-scroll">
        <TopNavbar />
        {/* px-8 pb-8 */}
        <main className="px-8 pb-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
