import React from 'react';
import { PageHeading } from '@/components/common';
import { APP_ROUTES } from '@/constants';
import { FAQSection, ContactSection } from '@/components/help';
import { Separator } from '@/components/ui/separator';

const HelpPage = () => {
  return (
    <div>
      <PageHeading
        title="Help & Support"
        subTitle="Find answers, tutorials, and get support for InterviewEase"
        breadcrumbs={[
          {
            href: APP_ROUTES.DASHBOARD,
            label: 'Dashboard',
          },
          {
            href: APP_ROUTES.HELP,
            label: 'Help',
          },
        ]}
      />

      <div className="">
        <FAQSection />
        <Separator />
        <ContactSection />
      </div>
    </div>
  );
};

export default HelpPage;
