import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { CallStatus } from '@/types';

interface InterviewSessionActionsProps {
  onDisconnectCall: () => void;
  callStatus: CallStatus;
  onCallStart: () => void;
  handleToggleMute: () => void;
  isMuted: boolean;
}

export const InterviewSessionActions = ({
  onDisconnectCall,
  callStatus,
  onCallStart,
  handleToggleMute,
  isMuted,
}: InterviewSessionActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {(callStatus === CallStatus.ACTIVE ||
        callStatus === CallStatus.CONNECTING) && (
        <Button
          variant={isMuted ? 'destructive' : 'outline'}
          size="lg"
          onClick={handleToggleMute}
          className="h-14 w-14 rounded-full"
        >
          {isMuted ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      )}
      {callStatus === CallStatus.INACTIVE ||
      callStatus === CallStatus.FINISHED ? (
        <Button
          onClick={onCallStart}
          size="lg"
          className="rounded-full border-2 border-green-600 bg-green-500 px-10 py-6 text-white transition-colors duration-200 ease-in hover:bg-green-600"
        >
          Start
        </Button>
      ) : (
        <Button
          onClick={onDisconnectCall}
          size="lg"
          className="rounded-full border-2 border-red-500 bg-red-400 px-10 py-6 text-white transition-colors duration-200 ease-in hover:bg-red-500"
        >
          End
        </Button>
      )}
    </div>
  );
};
