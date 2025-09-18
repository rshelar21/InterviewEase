import { PageHeading } from '@/components/common';
import { Calendar, Goal } from 'lucide-react';
import {
  RecentInterviews,
  UserPerformanceCard,
  StatsCard,
  MotivationalQuote,
} from '@/components/dashboard';

import { getAnalyticsDetails } from '@/api/analytics/db/analytics';

const DashboardPage = async () => {
  const { totalInterviews, upcomingThisWeek, lastSixMonths } =
    await getAnalyticsDetails();

  // console.log(totalInterviews, upcomingThisWeek, lastSixMonths);
  return (
    <div className="">
      <PageHeading
        title="Welcome back, admin"
        subTitle="Ready to ace your next interview? Let's see your progress."
      />

      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1">
            <StatsCard
              title="Total Interviews"
              description="This month"
              value={Number(totalInterviews || 0)}
              Icon={Goal}
              trend="up"
            />
          </div>

          {/* <div className="col-span-1">
            <StatsCard
              title="Avg. Duration"
              description="Per session"
              value={'42m'}
              Icon={Clock}
              trend="down"
            />
          </div> */}

          <div className="col-span-1">
            <StatsCard
              title="Upcoming"
              description="Scheduled"
              value={Number(upcomingThisWeek || 0)}
              Icon={Calendar}
              trend="neutral"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          <div className="col-span-1 lg:col-span-4">
            <UserPerformanceCard interviews={lastSixMonths} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="space-y-6">
              <MotivationalQuote />
              <RecentInterviews interviews={lastSixMonths} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
