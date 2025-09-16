'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateInterviewDialog } from './CreateInterviewDialog';

export const CreateInterviewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        size="lg"
        className="gap-2"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-5 w-5" />
        Create Interview
      </Button>
      <CreateInterviewDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        data={null}
      />
    </>
  );
};
