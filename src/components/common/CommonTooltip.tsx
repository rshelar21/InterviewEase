import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CommonTooltipProps {
  children: React.ReactNode;
  title: string;
}

export const CommonTooltip = ({ children, title }: CommonTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="max-w-xs break-words">{title}</TooltipContent>
    </Tooltip>
  );
};
