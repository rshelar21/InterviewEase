'use client';
import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InterviewSessionActions } from './InterviewSessionActions';
import { InterviewSessionHeader } from './InterviewSessionHeader';
import { Interview } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Error from 'next/error';
import { vapi } from '@/lib/vapi.config';
import { APP_ROUTES } from '@/constants';
import { interviewer } from '@/constants/interviewer';
import { cn } from '@/lib/utils';
import { createFeedback } from '@/actions';
import { toast } from 'sonner';
import { formatTimer } from '@/utils';
import { CallStatus } from '@/types';

interface InterviewSectionProps {
  interviewData: Interview | null;
  userName: string;
  userImg: string;
  userId: string;
}

interface SendMessage {
  role: 'user' | 'system' | 'assistanr';
  content: string;
}

export const InterviewSection = ({
  interviewData,
  userName,
  userImg,
  userId,
}: InterviewSectionProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SendMessage[]>([]);
  const [sessionTime, setSessionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    let timer: any;

    if (callStatus === CallStatus.ACTIVE) {
      timer = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log(error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);

    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SendMessage[]) => {
    toast.loading('Generating feedback');
    const data = await createFeedback({
      interviewId: interviewData?.id || '',
      transcript: messages,
      duration: formatTimer(sessionTime),
    });

    if (data?.id) {
      router.push(`${APP_ROUTES.INTERVIEWS}/${interviewData?.id}/feedback`);
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      handleGenerateFeedback(messages);
    }
  }, [messages, callStatus, userId]);

  const handleCallStart = () => {
    setCallStatus(CallStatus.CONNECTING);

    let formattedQuestions = '';
    const questions = interviewData?.questions;
    if (questions) {
      formattedQuestions = questions
        .map((question: string) => `- ${question}`)
        .join('\n');
    }

    vapi.start(interviewer, {
      variableValues: {
        questions: formattedQuestions,
      },
    });
  };

  const handleDisconnectCall = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
  };

  const latestMessage = messages[messages.length - 1]?.content;

  // const handlegenGenFeed = async () => {
  //   const m: any[] = dummyConvo;
  //   const data = await createFeedback({
  //     interviewId: interviewData?.id || '',
  //     transcript: m,
  //     duration: formatTimer(sessionTime),
  //   });

  //   if (data?.id) {
  //     router.push(`${APP_ROUTES.INTERVIEWS}/${interviewData?.id}/feedback`);
  //   }
  // };

  return (
    <div className="flex h-full flex-col gap-10 pb-4 md:pb-10">
      {/* header */}

      <div className="">
        <InterviewSessionHeader sessionTime={sessionTime} />
      </div>
      {/* users cards */}
      <div className="flex-1 px-6 lg:px-0">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <Card
                className={cn(
                  'cursor-pointer gap-4 py-6 md:py-12',
                  isSpeaking && 'shadow-border border-gray-600 shadow-md'
                )}
              >
                <div className="bg-background mx-auto h-fit w-fit rounded-full p-4 md:p-6">
                  <Bot className="size-12 md:size-16" />
                </div>
                <p className="text-center text-lg font-semibold">
                  AI Interviewer
                </p>
              </Card>
            </div>

            <div className="col-span-1">
              <Card className={cn('cursor-pointer gap-4 py-6 md:py-12')}>
                <div className="bg-background mx-auto h-fit w-fit rounded-full p-4 md:p-6">
                  <Avatar className="size-12 md:size-16">
                    <AvatarImage
                      src={`${userImg}`}
                      alt={userName || 'user-image'}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-center text-lg font-semibold">{userName}</p>
              </Card>
            </div>
          </div>

          <div className="h-[30px] overflow-y-auto pt-1 md:h-auto">
            <p className="text-left opacity-100 transition-opacity duration-300">
              {latestMessage}
            </p>
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="">
        <InterviewSessionActions
          onDisconnectCall={handleDisconnectCall}
          callStatus={callStatus}
          onCallStart={handleCallStart}
          handleToggleMute={handleToggleMute}
          isMuted={isMuted}
        />
      </div>
    </div>
  );
};
