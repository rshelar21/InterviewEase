'use client';
import { getResume } from '@/api/interview';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Eye, FileText, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { DownloadResumeButton } from './DownloadResumeButton';
import { ReuploadResumeButton } from './ReuploadResumeButton';

export const UserResumeSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['resume'],
    queryFn: () => getResume('/resume/upload'),
  });

  return (
    <div className="space-y-4">
      <h5 className="text-lg font-medium">Your Resume</h5>

      {isLoading ? (
        <LoaderCircle className="size-6 animate-spin" />
      ) : (
        <div className="flex items-start gap-2">
          <div className="bg-background h-fit w-fit rounded-full p-3">
            <FileText className="size-4 text-black dark:text-green-200" />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-base font-medium">{data?.data?.name}</p>

              <div className="flex items-center gap-2 py-1 text-gray-400">
                <Calendar className="size-4" />
                <span className="text-sm">
                  Uploaded{' '}
                  {data?.data?.createdAt &&
                    formatDistanceToNow(data?.data?.createdAt)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="col-span-1 w-full">
                <Link
                  href={data?.data?.resumeUrl || ''}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button className="w-full" variant="outline">
                    <Eye />
                    View
                  </Button>
                </Link>
              </div>

              <DownloadResumeButton
                fileName={data?.data?.name || ''}
                url={data?.data?.resumeUrl || ''}
              />
              <ReuploadResumeButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
