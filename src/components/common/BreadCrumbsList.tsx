import React from 'react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

interface BreadCrumbsListProps {
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  parentContainerClassName?: string;
}

export const BreadCrumbsList = ({
  breadcrumbs,
  parentContainerClassName,
}: BreadCrumbsListProps) => {
  return (
    <div className={cn('py-4', parentContainerClassName)}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((item, index) => {
            const isLast = breadcrumbs?.length - 1 === index;

            if (isLast) {
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{item?.label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item?.href}>{item?.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
