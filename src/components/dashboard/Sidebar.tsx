'use client';
import { APP_ROUTES, menuItems } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const NavItem = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hover:dark:bg-surface rounded-md text-base transition-colors dark:text-white',
        pathname === item?.href && 'dark:bg-surface bg-black text-white'
      )}
    >
      <Link href={item?.href} prefetch>
        <div className="flex cursor-pointer items-center gap-4 px-4 py-2">
          <item.icon className="size-4.5 flex-shrink-0" />
          <span>{item?.label}</span>
        </div>
      </Link>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="border-border relative hidden h-screen w-[230px] border-r transition-all duration-300 ease-in-out lg:inline-block">
      <div className="flex h-full flex-col">
        {/* App-Logo */}
        <div className="border-border flex h-16 items-center border-b px-5">
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

        <div className="scrollbar-none flex-1 overflow-x-hidden overflow-y-auto px-2 py-4">
          <div className="space-y-1.5 transition-all duration-200 ease-in-out">
            {menuItems?.map((item) => (
              <NavItem item={item} key={item?.id} />
            ))}
          </div>
        </div>

        <div className="border-border border-t px-2 py-4">
          <div className="space-y-1.5">
            {/* <NavItem
              item={{
                id: 'settings',
                label: 'Settings',
                href: '/settings',
                icon: Settings,
              }}
            /> */}
            <NavItem
              item={{
                id: 'help',
                label: 'Help & Support',
                href: '/help',
                icon: HelpCircle,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
