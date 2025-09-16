import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CustomAreaChart } from '@/components/common';

const data = [
  { label: 'Jan', value: 65, interviews: 8 },
  { label: 'Feb', value: 72, interviews: 12 },
  { label: 'Mar', value: 78, interviews: 15 },
  { label: 'Apr', value: 81, interviews: 18 },
  { label: 'May', value: 84, interviews: 22 },
  { label: 'Jun', value: 87, interviews: 25 },
  { label: 'July', value: 87, interviews: 25 },
  { label: 'Aug', value: 87, interviews: 25 },
  { label: 'Sept', value: 87, interviews: 25 },
  { label: 'Oct', value: 87, interviews: 25 },
  { label: 'Nov', value: 87, interviews: 25 },
  { label: 'Dec', value: 87, interviews: 25 },
];

export const UserPerformanceCard = () => {
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
        <CustomAreaChart data={data} />
      </CardContent>
    </Card>
  );
};
