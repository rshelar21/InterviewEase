'use client';
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadFile } from '@/utils';

interface DownloadResumeButtonProps {
  fileName: string;
  url: string;
}

export const DownloadResumeButton = ({
  fileName,
  url,
}: DownloadResumeButtonProps) => {
  return (
    <Button
      className="col-span-1 w-full"
      variant="outline"
      onClick={() => downloadFile(url, fileName)}
    >
      <Download />
      Download
    </Button>
  );
};
