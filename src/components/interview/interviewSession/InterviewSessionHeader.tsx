'use client';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

const currentQuestion = 4;
const totalQuestions = 20;

export const InterviewSessionHeader = () => {
  const [sessionTime, setSessionTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;

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
                {formatTime(sessionTime)}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Question</div>
                <div className="text-primary text-lg font-semibold">
                  {currentQuestion} of {totalQuestions}
                </div>
              </div>
              <div className="w-48">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
