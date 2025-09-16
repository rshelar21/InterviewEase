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
import { FileUploader } from './FileUploader';
import { toast } from 'sonner';
import { getResume, getSignUrl, uploadResume } from '@/api/interview';
import { LoaderCircle, Save } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const ResumeUploadDialog = () => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['resume'],
    queryFn: () => getResume('/resume/upload'),
  });
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
    } catch (err) {
      toast.error('Failed to Upload!');
    } finally {
      setFile(null);
      setIsLoading(false);
    }
  };

  if (data?.data?.id || loading) return null;

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
              Add your resume here.
            </DialogDescription>
          </div>
        </DialogHeader>

        <Separator />

        <div className="px-6">
          <div className="pt-4 pb-6">
            <FileUploader onDrop={handleFileDrop} />
          </div>
          <DialogFooter className="">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
              size="lg"
            >
              Submit
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
