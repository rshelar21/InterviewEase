import React from 'react';
import { LucideProps } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const StatsCard = ({
  title,
  description,
  value,
  Icon,
}: {
  title: string;
  description: string | React.ReactNode;
  value: string | number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
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
          <Badge variant="outline">{description}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
