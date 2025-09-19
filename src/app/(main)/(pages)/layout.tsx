import React from 'react';
import { Sidebar, TopNavbar } from '@/components/dashboard';
import { ResumeUploadDialog } from '@/components/interview';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex h-screen w-full">
        <Sidebar />
        <div className="w-full flex-1 overflow-y-scroll">
          <TopNavbar />

          <main className="px-6 pb-6 md:px-8 md:pb-8">{children}</main>
        </div>
        <ResumeUploadDialog />
      </div>
    </>
  );
};

export default DashboardLayout;
