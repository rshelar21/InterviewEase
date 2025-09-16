'use client';
import { menuItems } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { HelpCircle, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NavItem = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hover:bg-surface rounded-md text-base text-white transition-colors',
        pathname === item?.href && 'bg-surface'
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
    <div className="border-border relative h-screen w-[230px] border-r transition-all duration-300 ease-in-out">
      <div className="flex h-full flex-col">
        {/* App-Logo */}
        <div className="border-border flex h-16 items-center border-b px-5">
          <Link href="/dashbord" className="flex w-full items-center gap-3">
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

        <div className="scrollbar-none flex-1 overflow-x-hidden overflow-y-auto px-2 py-4">
          <div className="space-y-1.5 transition-all duration-200 ease-in-out">
            {menuItems?.map((item) => (
              <NavItem item={item} key={item?.id} />
            ))}
          </div>
        </div>

        <div className="border-border border-t px-2 py-4">
          <div className="space-y-1.5">
            <NavItem
              item={{
                id: 'settings',
                label: 'Settings',
                href: '/settings',
                icon: Settings,
              }}
            />
            <NavItem
              item={{
                id: 'help',
                label: 'Help',
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
