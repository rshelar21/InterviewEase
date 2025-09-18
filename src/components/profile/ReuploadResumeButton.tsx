'use client';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteResume } from '@/actions';
import { useQueryClient } from '@tanstack/react-query';

export const ReuploadResumeButton = () => {
  const queryClient = useQueryClient();
  const handleReupload = async () => {
    await deleteResume();
    queryClient.invalidateQueries({
      queryKey: ['resume'],
    });
  };
  return (
    <Button className="col-span-2" variant="default" onClick={handleReupload}>
      <Upload />
      Reupload Resume
    </Button>
  );
};
