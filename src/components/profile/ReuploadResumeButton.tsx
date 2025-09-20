'use client';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onOpen: () => void;
}

export const ReuploadResumeButton = ({ onOpen }: Props) => {
  const handleReupload = async () => {
    onOpen();
  };

  return (
    <Button className="col-span-2" variant="default" onClick={handleReupload}>
      <Upload />
      Reupload Resume
    </Button>
  );
};
