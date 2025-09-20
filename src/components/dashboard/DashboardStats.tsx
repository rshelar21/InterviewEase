import { Calendar, Clock, Goal } from 'lucide-react';
import { getAnalyticsDetails } from '@/data/dashboard';
import { avgDurationInSeconds } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from './StatsCard';
import { UserPerformanceCard } from './UserPerformanceCard';
import { MotivationalQuote } from './MotivationalQuote';
import { RecentInterviews } from './RecentInterviews';

export const DashboardStats = async () => {
  const { totalInterviews, upcomingThisWeek, lastSixMonths } =
    await getAnalyticsDetails();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1">
          <StatsCard
            title="Total Completed Interviews"
            description="This month"
            value={Number(totalInterviews || 0)}
            Icon={Goal}
          />
        </div>

        <div className="col-span-1">
          <StatsCard
            title="Upcoming"
            description="This week Scheduled"
            value={Number(upcomingThisWeek || 0)}
            Icon={Calendar}
          />
        </div>

        <div className="col-span-1">
          <StatsCard
            title="Avg. Duration"
            description="Per session"
            value={`${avgDurationInSeconds(lastSixMonths)} min`}
            Icon={Clock}
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
  );
};

export const DashboardStatsSkeleton = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div className="col-span-1" key={item}>
            <Card>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-5 w-[200px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-12" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="space-y-6">
            <MotivationalQuote />
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-6" />

                  <div className="border-border flex items-start gap-4 rounded-lg border p-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6" />
                      <Skeleton className="h-6" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
