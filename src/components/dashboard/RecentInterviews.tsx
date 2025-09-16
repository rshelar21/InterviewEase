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

interface Interview {
  id: number;
  company: string;
  position: string;
  date: string;
  duration: string;
  status: string;
  score: number;
  interviewer: string;
  type: string;
}

interface RecentInterviewCardProps {
  interview: Interview;
}

const interviews = [
  {
    id: 1,
    company: 'Google',
    position: 'Senior Frontend Developer',
    date: '2024-01-15',
    duration: '45m',
    status: 'completed',
    score: 92,
    interviewer: 'Sarah Chen',
    type: 'Technical',
  },
  {
    id: 2,
    company: 'Microsoft',
    position: 'React Developer',
    date: '2024-01-12',
    duration: '38m',
    status: 'completed',
    score: 88,
    interviewer: 'John Smith',
    type: 'Behavioral',
  },
  {
    id: 3,
    company: 'Meta',
    position: 'Full Stack Engineer',
    date: '2024-01-10',
    duration: '52m',
    status: 'completed',
    score: 85,
    interviewer: 'Lisa Wang',
    type: 'System Design',
  },
  {
    id: 4,
    company: 'Amazon',
    position: 'Software Engineer',
    date: '2024-01-08',
    duration: '41m',
    status: 'completed',
    score: 79,
    interviewer: 'Mike Johnson',
    type: 'Technical',
  },
];

const RecentInterviewCard = ({ interview }: RecentInterviewCardProps) => {
  return (
    <div
      key={interview.id}
      className="border-border hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`/abstract-geometric-shapes.png?height=40&width=40&query=${interview.company} logo`}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {interview.company.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{interview.company}</h4>
            <Badge variant="outline" className="text-xs">
              {interview.type}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{interview.position}</p>
          <div className="text-muted-foreground flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(interview.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {interview.duration}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-primary text-2xl font-bold">
          {interview.score}%
        </div>
        <p className="text-muted-foreground text-xs">Score</p>
      </div>
    </div>
  );
};

export const RecentInterviews = () => {
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
