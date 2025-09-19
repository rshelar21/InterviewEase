'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  Star,
  Building2,
  MoreHorizontal,
  Edit,
  Calendar,
  Clock,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';
import { Interview } from '@/types';
import { deleteInterview } from '@/actions';
import { useQueryClient } from '@tanstack/react-query';
import { formatDateOnly } from '@/utils';
import { TruncateText } from '@/components/common';
import { CommonTooltip } from '@/components/common';
import { difficultyConfig, statusConfig, interviewTypeConfig } from '@/utils';

interface InterviewCardProps {
  interview: Interview;
  onOpenEditInterview: (data: Interview) => void;
}

export const InterviewCard = ({
  interview,
  onOpenEditInterview,
}: InterviewCardProps) => {
  const queryClient = useQueryClient();

  const handleDelete = async (): Promise<void> => {
    await deleteInterview(interview?.id);
    queryClient.invalidateQueries({
      queryKey: ['interview'],
    });
  };

  return (
    <Link
      href={
        interview?.status === 'DRAFT' || interview?.status === 'SCHEDULED'
          ? `${APP_ROUTES.INTERVIEW_SESSION}/${interview?.id}`
          : `${APP_ROUTES.INTERVIEWS}/${interview?.id}/${APP_ROUTES.FEEDBACK}`
      }
    >
      <Card className="group hover:border-primary/20 border-border border-2 transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="border-background h-12 w-12 border-2 shadow-sm">
                <AvatarImage
                  // src={'/placeholder.svg'}
                  alt={interview?.companyName}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {interview?.companyName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg leading-tight font-semibold text-balance">
                  {interview?.title}
                </h3>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Building2 className="h-3 w-3" />
                  {interview?.companyName}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="gap-2"
                  disabled={interview.status === 'COMPLETED'}
                  onClick={async (e) => {
                    e.stopPropagation();
                    onOpenEditInterview(interview);
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  disabled={interview.status === 'COMPLETED'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                statusConfig[interview?.status as keyof typeof statusConfig]
                  .variant
              }
              className="gap-1"
            >
              <div
                className={`block h-2 w-2 rounded-full ${statusConfig[interview?.status as keyof typeof statusConfig].color}`}
              />
              <span>
                {
                  statusConfig[interview?.status as keyof typeof statusConfig]
                    .label
                }
              </span>
            </Badge>
            <Badge
              variant="outline"
              className={
                difficultyConfig[
                  interview?.difficulty as keyof typeof difficultyConfig
                ].color
              }
            >
              {
                difficultyConfig[
                  interview?.difficulty as keyof typeof difficultyConfig
                ].label
              }
            </Badge>
            <Badge variant="outline" className="text-xs">
              {interviewTypeConfig[interview?.interviewType].label}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <CommonTooltip title="Interview Date">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {interview.scheduleLater &&
                    interview?.scheduledDate &&
                    formatDateOnly(interview?.scheduledDate)}
                  {!interview.scheduleLater &&
                    interview?.createdAt &&
                    formatDateOnly(interview?.createdAt)}
                </div>
              </CommonTooltip>

              <CommonTooltip title="Interview Duration">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {interview?.duration || '00:00'} min
                </div>
              </CommonTooltip>
            </div>
          </div>

          <TruncateText
            text={interview?.description}
            maxLength={130}
            textClassName="text-muted-foreground line-clamp-3 text-sm leading-relaxed text-left min-h-[70px] h-full"
          />

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{interview?.rating}/5</span>
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            className="w-full gap-2 transition-all group-hover:gap-3"
            size="lg"
            variant="outline"
          >
            {interview.status === 'COMPLETED' ? 'Review' : 'Start Preparation'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
