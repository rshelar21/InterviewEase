'use client';
import { Clock } from 'lucide-react';
import { formatTimer } from '@/utils';

interface InterviewSessionHeaderProps {
  sessionTime: number;
}

export const InterviewSessionHeader = ({
  sessionTime,
}: InterviewSessionHeaderProps) => {
  return (
    <div>
      <div className="border-border bg-card/50 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                <span className="text-foreground text-sm font-medium">
                  Live Interview
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {formatTimer(sessionTime)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
