import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Interview } from '@/types';
import { formatDateOnly, formatTimeOnly } from '@/utils';
import { APP_ROUTES } from '@/constants';

interface RecentInterviewCardProps {
  interview: Partial<Interview>;
}

const RecentInterviewCard = ({ interview }: RecentInterviewCardProps) => {
  return (
    <div>
      <Link
        href={
          interview?.status === 'DRAFT' || interview?.status === 'SCHEDULED'
            ? `${APP_ROUTES.INTERVIEW_SESSION}/${interview?.id}`
            : `${APP_ROUTES.INTERVIEWS}/${interview?.id}/${APP_ROUTES.FEEDBACK}`
        }
      >
        <div className="border-border hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${interview?.companyName} logo`}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {interview?.companyName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{interview.companyName}</h4>
                <Badge variant="outline" className="text-xs">
                  {interview?.interviewType}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{interview.title}</p>
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />

                  {interview?.createdAt && formatDateOnly(interview?.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {interview?.createdAt && formatTimeOnly(interview?.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-primary text-2xl font-bold">
              {interview?.score}
              <span className="text-muted-foreground text-xs">/100</span>
            </div>
            <p className="text-muted-foreground text-xs">Score</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const RecentInterviews = ({
  interviews,
}: {
  interviews: Partial<Interview>[];
}) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="">
        <CardTitle className="text-2xl font-medium">
          Recent Interviews
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your latest interview sessions and performance
        </CardDescription>
        <CardAction>
          <Link href="/interviews">
            <Button variant="link">
              View All
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews?.map((item) => (
            <RecentInterviewCard interview={item} key={item.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
