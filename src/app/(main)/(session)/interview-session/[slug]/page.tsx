import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { getUser } from '@/api/user/getUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  InterviewSessionHeader,
  InterviewSessionActions,
} from '@/components/interview';

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getUser();

  return (
    <div className="flex h-full flex-col pb-10">
      {/* header */}
      <div className="">
        <InterviewSessionHeader />
      </div>
      {/* users cards */}
      <div className="flex-1">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between pt-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <Card className="cursor-pointer gap-4 py-12">
                <div className="bg-background mx-auto h-fit w-fit rounded-full p-6">
                  <Bot className="size-16" />
                </div>
                <p className="text-center text-lg font-semibold">
                  AI Interviewer
                </p>
              </Card>
            </div>

            <div className="col-span-1">
              <Card className="cursor-pointer gap-4 py-12">
                <div className="bg-background mx-auto h-fit w-fit rounded-full p-6">
                  <Avatar className="size-16">
                    <AvatarImage
                      src={`${session?.user?.image}`}
                      alt={session?.user?.name || 'user-image'}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-center text-lg font-semibold">
                  {session?.user?.name}
                </p>
              </Card>
            </div>
          </div>

          <div className="">
            <p>This is ${slug} </p>
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="">
        <InterviewSessionActions />
      </div>
    </div>
  );
}
