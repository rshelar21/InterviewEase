'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: 'Success is where preparation and opportunity meet.',
    author: 'Bobby Unser',
  },
  {
    text: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
  },
  {
    text: 'Confidence comes from preparation.',
    author: 'John Wooden',
  },
];

export function MotivationalQuote() {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentState((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Quote className="text-primary mt-1 h-8 w-8 flex-shrink-0" />
          <div className="space-y-3">
            <blockquote className="text-2xl leading-relaxed font-semibold text-balance">
              &quot;{quotes[currentState].text}&quot;
            </blockquote>
            <cite className="text-muted-foreground text-sm font-medium">
              — {quotes[currentState].author}
            </cite>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
