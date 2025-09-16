import React from 'react';
import Image from 'next/image';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen max-h-screen flex-col">
      <div className="flex h-16 items-center border-b px-5">
        <div className="flex w-full items-center gap-3">
          <Image
            src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
            alt="CMSFullForm"
            width={32}
            height={32}
            className="hidden flex-shrink-0 dark:block"
          />

          <Image
            src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
            alt="CMSFullForm"
            width={32}
            height={32}
            className="block flex-shrink-0 dark:hidden"
          />
          <span className="text-lg font-semibold text-gray-900 transition-opacity duration-200 hover:cursor-pointer dark:text-white">
            InterviewEase
          </span>
        </div>
      </div>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
