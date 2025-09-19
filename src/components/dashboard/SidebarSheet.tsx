'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HelpCircle, SquareChevronRight } from 'lucide-react';
import { menuItems } from '@/constants';
import { Button } from '@/components/ui/button';
import { NavItem } from './Sidebar';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SidebarSheet = ({ onOpenChange, open }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="transform-none p-0" side="left">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex h-full flex-col justify-between overflow-y-auto px-2 pb-2">
          <div className="pb-4">
            {menuItems?.map((item) => (
              <NavItem item={item} key={item?.id} />
            ))}
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
                  label: 'Help',
                  href: '/help',
                  icon: HelpCircle,
                }}
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export const SidebarSheetButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex lg:hidden">
      <Button
        variant="ghost"
        size="sm"
        className="p-2"
        onClick={() => setIsOpen(true)}
      >
        <SquareChevronRight className="h-4 w-4" />
      </Button>

      <SidebarSheet open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};
