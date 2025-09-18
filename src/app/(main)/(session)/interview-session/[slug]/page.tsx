import { getUser } from '@/api/user/getUser';
import { InterviewSection } from '@/components/interview';
import { getIntervieDetails } from '@/api/interview';

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interview = await getIntervieDetails(slug);
  const session = await getUser();

  return (
    <>
      <InterviewSection
        interviewData={interview}
        userName={session?.user?.name || ''}
        userImg={session?.user?.image || ''}
        userId={session?.user?.id || ''}
      />
    </>
  );
}
