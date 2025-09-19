import { ThemeToogle } from '@/components/common';
import { UserInfoCard } from './UserInfoCard';
import { SidebarSheetButton } from './SidebarSheet';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';
import { NotificationMenu } from './NotificationMenu';

export const TopNavbar = async () => {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="border-border flex h-16 items-center justify-between border-b px-4 lg:justify-end lg:px-6">
        <div className="flex lg:hidden">
          <Link
            href={APP_ROUTES.HOME}
            className="-ml-8 flex w-full items-center gap-2"
          >
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
          </Link>
        </div>
        <div className="flex items-center">
          <SidebarSheetButton />
          <NotificationMenu />
          <ThemeToogle />

          <UserInfoCard />
        </div>
      </div>
    </header>
  );
};
