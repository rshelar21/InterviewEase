'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { FileUploader } from '../common/FileUploader';
import { toast } from 'sonner';
import { getResume, getSignUrl, uploadResume } from '@/api/interview';
import { LoaderCircle, Save, SkipForward } from 'lucide-react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { getUserDetails } from '@/api/user/user';
import { updateUserPreference } from '@/actions';

interface ResumeUploadDialogProps {
  isForceOpen?: boolean;
  onForcedClose?: () => void;
}

export const ResumeUploadDialog = ({
  isForceOpen = false,
  onForcedClose,
}: ResumeUploadDialogProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['user'],
        queryFn: () => getUserDetails('/user'),
      },
      {
        queryKey: ['resume'],
        queryFn: () => getResume('/resume/upload'),
      },
    ],
  });

  const userData = results[0].data;
  const resumeData = results[1].data;
  const loading = results[0].isLoading || results[1].isLoading;

  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = useCallback((file: File[]) => {
    setFile(file[0]);
  }, []);

  const handleSubmit = async (): Promise<void> => {
    if (!file) {
      toast.error('Please Select File');
      return;
    }
    setIsLoading(true);

    try {
      const sigRes = await getSignUrl('/resume/create-link');

      const { signature, timestamp, folder, cloud_name, api_key } = sigRes;

      // Step 2: Prepare form data for Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);
      // formData.append('resource_type', 'raw');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();

      await uploadResume(`/resume/upload?pdf_url=${data?.secure_url}`, {
        method: 'POST',
        body: JSON.stringify({
          fileName: data?.original_filename,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Failed to Upload!');
    } finally {
      setFile(null);
      setIsLoading(false);
    }
  };

  const handleSkipUpload = async (): Promise<void> => {
    if (isForceOpen) {
      onForcedClose?.();
      return;
    }
    try {
      await updateUserPreference({
        resumeSkipped: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  if (
    resumeData?.data?.id ||
    loading ||
    (userData?.data?.resumeSkipped && !isForceOpen)
  )
    return null;

  return (
    <Dialog open>
      <DialogContent
        className="gap-0 px-0 sm:max-w-[550px]"
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pb-4">
          <div>
            <DialogTitle className="text-2xl">Upload Your Resume</DialogTitle>
            <DialogDescription className="text-base">
              Add your resume here to get started with AI-powered interview
              preparation
            </DialogDescription>
          </div>
        </DialogHeader>

        <Separator />

        <div className="px-6">
          <div className="pt-4 pb-6">
            <FileUploader onDrop={handleFileDrop} />
          </div>
          <DialogFooter className="flex items-center gap-2">
            <Button
              variant="outline"
              // className="w-full"
              onClick={handleSkipUpload}
              disabled={isLoading}
              size="lg"
            >
              <SkipForward />
              Skip for now
            </Button>
            <Button
              variant="default"
              // className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
