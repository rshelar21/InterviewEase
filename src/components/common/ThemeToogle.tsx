'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ThemeToogle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="dark:hover:bg-surface relative cursor-pointer p-2 transition-colors hover:bg-gray-100"
        >
          <Sun className="h-5 w-5 text-gray-600 transition-all dark:hidden dark:text-gray-300" />
          <Moon className="hidden h-5 w-5 text-gray-600 transition-all dark:block dark:text-gray-300" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
};
