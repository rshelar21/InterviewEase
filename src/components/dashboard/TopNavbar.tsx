import { ThemeToogle } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserInfoCard } from './UserInfoCard';

export const TopNavbar = async () => {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="border-border flex h-16 items-center justify-end border-b px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <ThemeToogle />

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
          <UserInfoCard />
        </div>
      </div>
    </header>
  );
};
