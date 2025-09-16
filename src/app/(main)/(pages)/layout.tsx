import React from 'react';
import { Sidebar, TopNavbar } from '@/components/dashboard';
import { ResumeUploadDialog } from '@/components/common';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex h-screen w-full">
        <Sidebar />
        <div className="w-full flex-1 overflow-y-scroll">
          <TopNavbar />
          {/* px-8 pb-8 */}
          <main className="px-8 pb-8">{children}</main>
        </div>
        <ResumeUploadDialog />
      </div>
    </>
  );
};

export default DashboardLayout;
