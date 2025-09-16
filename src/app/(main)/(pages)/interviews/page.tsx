import { Suspense } from 'react';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { PageHeading } from '@/components/common';
import { InterviewsList, CreateInterviewButton } from '@/components/interview';
import { getInterviews } from '@/api/interview';

const InterviewsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['interview'],
    queryFn: async () => await getInterviews(`/interview`),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="h-full">
      <PageHeading
        title="Interview Preparation"
        subTitle="Manage and track your interview sessions"
        actions={<CreateInterviewButton />}
      />
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<p>loading</p>}>
          <InterviewsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default InterviewsPage;
