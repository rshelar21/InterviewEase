import { Suspense } from 'react';
import { getUser } from '@/api/user/getUser';
import { PageHeading } from '@/components/common';
import { DashboardStats, DashboardStatsSkeleton } from '@/components/dashboard';

const DashboardPage = async () => {
  const session = await getUser();

  return (
    <div className="">
      <PageHeading
        title={`Welcome back, ${session?.user?.name}`}
        subTitle="Ready to ace your next interview? Let's see your progress."
      />
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
