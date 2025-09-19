import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building2, FileText } from 'lucide-react';
import { Interview } from '@/types';
import { TruncateText } from '@/components/common';
import { interviewTypeConfig, difficultyConfig } from '@/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface InterviewDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export const InterviewDetails = ({
  isOpen,
  onClose,
  interview,
}: InterviewDetailsProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="transform-none p-0" side="right">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center">
            <SheetTitle>Interview Details</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex h-full flex-col justify-between overflow-y-auto px-4 pb-2">
          <div className="pb-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-2 flex items-center gap-2">
                <Building2 className="text-primary h-5 w-5" />
                Position Details
              </div>

              <div className="col-span-1">
                <h5 className="text-muted-foreground text-base font-normal">
                  Job Title:{' '}
                </h5>
                <p className="">{interview?.title}</p>
              </div>

              <div className="col-span-1">
                <h5 className="text-muted-foreground text-base font-normal">
                  Company:{' '}
                </h5>
                <p className="">{interview?.companyName}</p>
              </div>

              <div className="col-span-2">
                <Separator />
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <FileText className="size-4" />
                  <h5 className="text-muted-foreground text-base font-normal">
                    Job Description:{' '}
                  </h5>
                </div>
                <div className="">
                  <TruncateText
                    text={interview?.jobDescription || ''}
                    maxLength={100}
                    textClassName="text-left font-normal"
                  />
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {
                    interviewTypeConfig[interview?.interviewType || 'TECHNICAL']
                      .label
                  }
                </Badge>

                <Badge
                  className={
                    difficultyConfig[
                      interview?.difficulty as keyof typeof difficultyConfig
                    ].color
                  }
                >
                  {
                    difficultyConfig[interview?.difficulty || 'ENTRY_LEVEL']
                      .labelc
                  }
                </Badge>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <FileText className="size-4" />
                  <h5 className="text-muted-foreground text-base font-normal">
                    Interview Description:{' '}
                  </h5>
                </div>

                <div className="">
                  <TruncateText
                    text={interview?.description || ''}
                    maxLength={100}
                    textClassName="text-left font-normal"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
