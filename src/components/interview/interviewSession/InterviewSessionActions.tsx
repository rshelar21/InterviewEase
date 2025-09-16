'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

export const InterviewSessionActions = () => {
  const [isMuted, setIsMuted] = useState(false);
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant={isMuted ? 'destructive' : 'outline'}
        size="lg"
        onClick={() => setIsMuted(!isMuted)}
        className="h-14 w-14 rounded-full"
      >
        {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
      <Button
        size="lg"
        className="rounded-full border-2 border-red-500 bg-red-400 px-10 py-6 text-white transition-colors duration-200 ease-in hover:bg-red-500"
      >
        End
      </Button>
    </div>
  );
};
