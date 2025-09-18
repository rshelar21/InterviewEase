'use client';

import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CustomAreaChart } from '@/components/common';
import { Interview } from '@/types';
import { format } from 'date-fns';

export const UserPerformanceCard = ({
  interviews,
}: {
  interviews: Partial<Interview>[];
}) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, { totalScore: number; interviews: number }> =
      {};

    interviews.forEach((interview) => {
      const effectiveDate =
        interview.scheduleLater && interview.scheduledDate
          ? new Date(interview?.scheduledDate)
          : interview?.createdAt
            ? new Date(interview?.createdAt)
            : new Date();

      const month = format(effectiveDate, 'MMM'); // e.g. "Sep"

      if (!grouped[month]) {
        grouped[month] = { totalScore: 0, interviews: 0 };
      }

      grouped[month].totalScore += interview.score ?? 0;
      grouped[month].interviews += 1;
    });

    return Object.entries(grouped).map(([month, stats]) => ({
      label: month,
      value: stats.totalScore / stats.interviews, // avg score
      interviews: stats.interviews,
    }));
  }, [interviews]); // recompute only when rawData changes

  // console.log(chartData)
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="">
        <CardTitle className="text-2xl font-medium">
          Performance Trends
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your interview performance and activity over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomAreaChart data={chartData} />
      </CardContent>
    </Card>
  );
};
