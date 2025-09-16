'use client';

import { useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Trash, Upload } from 'lucide-react';
import { MAX_FILE_SIZE_LIMIT } from '@/constants';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onDrop: (file: File[]) => void;
  isAllowMultipleFiles?: boolean;
}

export const FileUploader = ({
  onDrop,
  isAllowMultipleFiles = false,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRejectedFile = (fileRejections: FileRejection[]) => {
    const isFileLarge = fileRejections.find(
      (file) => file.errors[0].code === 'file-too-large'
    );

    const isManyFiles = fileRejections.find(
      (file) => file.errors[0].code === 'too-many-files'
    );

    const isInvalidFile = fileRejections.find(
      (file) => file.errors[0].code === 'file-invalid-type'
    );

    if (isFileLarge) {
      toast.error('File is large');
      return;
    }

    if (isManyFiles) {
      toast.error('Too many files');
      return;
    }

    if (isInvalidFile) {
      toast.error('File is invalid');
      return;
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(
      isAllowMultipleFiles ? [...files, ...acceptedFiles] : acceptedFiles
    );
    onDrop(acceptedFiles);
  };

  const handleRemoveFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
    onDrop(updatedFiles);
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: isAllowMultipleFiles,
    onDropRejected: handleRejectedFile,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE_LIMIT,
  });

  return (
    <>
      <Card
        className={cn(
          'rounded-lg border-2 border-dashed',
          isDragActive && 'border-white'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CardContent className="cursor-pointer py-6 text-center">
          <div className="bg-background mx-auto h-fit w-fit rounded-full p-3">
            <Upload className="text-muted-foreground size-6" />
          </div>
          <p className="text-muted-foreground py-2 text-sm">
            <span className="underline underline-offset-3">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <p className="text-muted-foreground text-xs">PDF up to 5MB</p>
        </CardContent>
      </Card>

      <>
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-md border px-3 py-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-muted rounded-full p-2">
                    <FileText className="size-4" />
                  </div>
                  <p className="truncate">{file.name}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveFile(file.name)}
                  className="border border-red-300 bg-red-100/10 hover:bg-transparent hover:text-red-700"
                  size="icon"
                >
                  <Trash className="size-4 text-red-400" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};
