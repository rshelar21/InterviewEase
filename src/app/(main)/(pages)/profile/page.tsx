import { PageHeading } from '@/components/common';
import { APP_ROUTES } from '@/constants';
import { ProfileCard, ProfileCardSkeleton } from '@/components/profile';
import { Suspense } from 'react';

const ProfilePage = async () => {
  return (
    <div>
      <PageHeading
        breadcrumbs={[
          {
            href: APP_ROUTES.DASHBOARD,
            label: 'Dashboard',
          },
          {
            label: 'Profile',
            href: APP_ROUTES.PROFILE,
          },
        ]}
        title="Your Profile"
        subTitle="Manage your profile and track your interview preparation progress"
      />
      <Suspense fallback={<ProfileCardSkeleton />}>
        <ProfileCard />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
