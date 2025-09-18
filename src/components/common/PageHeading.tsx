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

interface Props {
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
}

export const PageHeading = ({
  subTitle,
  title,
  actions,
  className,
  breadcrumbs,
}: Props) => {
  return (
    <div className="pt-10 pb-10">
      {!!breadcrumbs?.length && (
        <div className="py-4">
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
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink asChild>
                        <Link href={item?.href}>{item?.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
      <div className={cn('flex justify-between', className)}>
        <div>
          {typeof title === 'string' ? (
            <h1 className="text-3xl font-semibold">{title}</h1>
          ) : (
            title
          )}
          {typeof subTitle === 'string' ? (
            <p className="text-base">{subTitle}</p>
          ) : (
            subTitle
          )}
        </div>
        {actions && actions}
      </div>
    </div>
  );
};
