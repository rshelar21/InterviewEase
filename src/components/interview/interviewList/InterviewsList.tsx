'use client';
import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { generateUrl } from '@/utils/generateUrl';
import { getInterviews } from '@/api/interview';
import { DEFAULT_API_LIMIT } from '@/constants';
import { InterviewCard } from './InterviewCard';
import { Button } from '@/components/ui/button';
import { CreateInterviewDialog } from '../createInterviewForm/CreateInterviewDialog';
import { Interview } from '@/types';

export const InterviewsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState<null | Interview>(
    null
  );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['interview'],
      queryFn: async (pageParam) => {
        const url = generateUrl({
          path: '/interview',
          params: {
            limit: DEFAULT_API_LIMIT,
            page: pageParam?.pageParam,
          },
        });
        return await getInterviews(url);
      },
      initialPageParam: 1,

      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta?.nextPage : undefined,
    });

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages
          ?.flatMap((pages) => pages?.data)
          .map((item) => (
            <div className="col-span-1" key={item.id}>
              <InterviewCard
                interview={item}
                onOpenEditInterview={(data) => {
                  setIsOpen(true);
                  setInterviewDetails(data);
                }}
              />
            </div>
          ))}
      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="bg-white text-base font-medium disabled:opacity-50"
            variant="outline"
          >
            Load more
          </Button>
        )}
      </div>

      <CreateInterviewDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        data={interviewDetails}
      />
    </div>
  );
};
