import React from 'react';
import { LucideProps } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatsCard = ({
  title,
  description,
  value,
  Icon,
  trend,
}: {
  title: string;
  description: string | React.ReactNode;
  value: string | number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <Card className="relative gap-4 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <div className="bg-background/50 rounded-lg p-2">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="text-4xl font-bold">{value}</div>

        <div className="flex items-center gap-2">
          {trend === 'up' && (
            <Badge variant="secondary" className="bg-green-200 text-green-700">
              <TrendingUp className="mr-1 h-3 w-3" />
              12
            </Badge>
          )}
          {trend === 'down' && (
            <Badge variant="secondary" className="bg-red-200 text-red-700">
              <TrendingDown className="mr-1 h-3 w-3" />
              10
            </Badge>
          )}
          {trend === 'neutral' && <Badge variant="outline">This week</Badge>}
          <span className="text-muted-foreground text-xs">{description}</span>
          {/* <p className="text-muted-foreground mt-1 text-xs">{description}</p> */}
        </div>
      </CardContent>
    </Card>
  );
};
