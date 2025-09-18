import React from 'react';
import { cn } from '@/lib/utils';
import { BreadCrumbsList } from './BreadCrumbsList';

interface Props {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
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
      {!!breadcrumbs?.length && <BreadCrumbsList breadcrumbs={breadcrumbs} />}
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
