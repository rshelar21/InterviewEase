'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, MessagesSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import Link from 'next/link';
import { APP_ROUTES } from '@/constants';

import { format, formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getInterviewNofications } from '@/api/interview';

export const NotificationMenu = () => {
  const { data } = useQuery({
    queryKey: ['notifcations'],
    queryFn: () => getInterviewNofications('/notifications'),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border-none outline-none focus-visible:border-none"
      >
        <Button variant="ghost" size="icon" asChild>
          <div className="relative">
            <Bell />
            {data?.data?.length && (
              <Badge className="absolute top-0 right-0.5 h-4 min-w-4 rounded-full bg-red-500 px-1 font-mono text-white tabular-nums">
                {data?.data?.length}
              </Badge>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.data?.length === 0 && (
          <DropdownMenuItem>
            <p className="text-muted-foreground font-normal">
              No Noficiations!
            </p>
          </DropdownMenuItem>
        )}
        {data?.data?.map((item) => (
          <React.Fragment key={item?.id}>
            <DropdownMenuItem asChild>
              <Link
                href={`${APP_ROUTES.INTERVIEW_SESSION}/${item?.id}`}
                className="flex w-full"
              >
                <MessagesSquare className="mr-2 size-4" />
                <div>
                  <p>{item?.title}</p>
                  {item.scheduledDate && (
                    <p className="text-muted-foreground font-normal">
                      {format(item?.scheduledDate, 'dd, MMM')} -{' '}
                      {formatDistanceToNow(item?.scheduledDate)}
                    </p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
