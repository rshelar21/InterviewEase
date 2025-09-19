import React from 'react';
import Image from 'next/image';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen max-h-screen flex-col">
      <div className="flex h-16 items-center border-b">
        <div className="flex w-full items-center gap-3">
          <Image
            src="/assets/icons/logo.png"
            alt="InterviewEase"
            width={100}
            height={150}
            className="block flex-shrink-0 object-cover"
            priority
          />

          <span className="-ml-6 text-xl font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-80 dark:text-white">
            Interview<span className="text-[#7877c6]">Ease</span>
          </span>
        </div>
      </div>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
