import { ThemeToogle } from '@/components/common';
import { UserInfoCard } from './UserInfoCard';
import { SidebarSheetButton } from './SidebarSheet';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';

export const TopNavbar = async () => {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="border-border flex h-16 items-center justify-between border-b px-4 lg:justify-end lg:px-6">
        <div className="flex lg:hidden">
          <Link
            href={APP_ROUTES.DASHBOARD}
            className="flex w-full items-center gap-3"
          >
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
          </Link>
        </div>
        <div className="flex items-center">
          <SidebarSheetButton />
          <ThemeToogle />

          <UserInfoCard />
        </div>
      </div>
    </header>
  );
};
