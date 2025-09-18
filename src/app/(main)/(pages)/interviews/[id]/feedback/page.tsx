import { getInterviewFeedback } from '@/api/interview';
import {
  Star,
  Calendar,
  Clock,
  Target,
  MessageSquare,
  Brain,
  Lightbulb,
  Users,
  Eye,
  BarChart3,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { formatDateOnly } from '@/utils';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BreadCrumbsList, CommonTooltip } from '@/components/common';
import { interviewTypeConfig } from '@/utils';
import { APP_ROUTES } from '@/constants';
import { CategoryScore } from '@/types';
const FeedbackPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const feedback = await getInterviewFeedback(id);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80)
      return 'bg-green-50 border-green-200 dark:border-green-200/20 dark:bg-green-50/5';
    if (score >= 60)
      return 'bg-amber-50 border-amber-200 dark:border-amber-200/20 dark:bg-amber-50/5';
    if (score >= 40)
      return 'bg-orange-50 border-orange-200 dark:border-orange-200/20 dark:bg-orange-50/5';
    return 'bg-red-50 border-red-200 dark:border-red-200/20 dark:bg-red-50/5';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleGetIcon = (type: string) => {
    let icon;
    switch (type) {
      case 'communication skills':
        icon = MessageSquare;
      case 'technical knowledge':
        icon = Brain;
      case 'problem-solving':
        icon = Lightbulb;
      case 'cultural fit':
        icon = Users;
      case 'confidence & clarity':
        icon = Eye;
      default:
        icon = MessageSquare;
    }
    return icon;
  };

  return (
    <div className="py-10">
      <BreadCrumbsList
        breadcrumbs={[
          {
            href: APP_ROUTES.INTERVIEWS,
            label: 'Interviews',
          },
          {
            href: APP_ROUTES.FEEDBACK,
            label: 'Feedback',
          },
        ]}
        parentContainerClassName="pb-8"
      />
      <div className="space-y-10">
        <Card className="dark:bg-card border-2 border-green-200 bg-green-50 dark:border-green-200/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-2 lg:flex-row">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <h1 className="mb-2 text-3xl font-bold text-balance">
                    Feedback on the Interview - {feedback?.Interview?.title}
                  </h1>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
                    <CommonTooltip title="Interview Date">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {feedback?.Interview?.scheduleLater &&
                          feedback?.Interview?.scheduledDate &&
                          formatDateOnly(feedback?.Interview?.scheduledDate)}
                        {!feedback?.Interview?.scheduleLater &&
                          feedback?.Interview?.createdAt &&
                          formatDateOnly(feedback?.Interview?.createdAt)}
                      </div>
                    </CommonTooltip>
                    <CommonTooltip title="Interview Duration">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {feedback?.Interview?.duration} min
                      </div>
                    </CommonTooltip>

                    <CommonTooltip title="Interview Type">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {
                          interviewTypeConfig[
                            feedback?.Interview?.interviewType || 'TECHNICAL'
                          ].label
                        }{' '}
                        Interview
                      </div>
                    </CommonTooltip>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-5 w-5',
                          Number(feedback?.Interview?.rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-lg font-semibold">
                      {Number(feedback?.Interview?.rating)} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-primary mb-2 text-6xl font-bold">
                  {Number(feedback?.Interview?.score || 0)}
                  <span className="text-muted-foreground text-2xl">/100</span>
                </div>
                <p className="text-muted-foreground text-sm">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="text-primary h-5 w-5" />
                    Detailed Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {feedback?.categoryScores?.map((category: CategoryScore) => {
                    const Icon = handleGetIcon(category?.name?.toLowerCase());
                    return (
                      <div
                        key={category.name}
                        className={cn(
                          'cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md',
                          getScoreBgColor(category.score)
                        )}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button variant="outline">
                              <Icon className="size-4" />
                            </Button>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {category.name}
                              </h3>
                              {/* <p className="text-muted-foreground text-sm">
                              {category.score}/100 
                            </p> */}
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={cn(
                                'text-primary text-2xl font-bold',
                                getScoreColor(category.score)
                              )}
                            >
                              {category.score}
                              <span className="text-muted-foreground text-base">
                                /100
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="relative">
                            <Progress value={category.score} className="h-3" />
                            <div
                              className={cn(
                                'absolute inset-0 rounded-full',
                                getProgressColor(category.score)
                              )}
                              style={{ width: `${category.score}%` }}
                            />
                          </div>

                          <p className="text-sm leading-relaxed text-pretty">
                            {category.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interview Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Duration
                    </span>
                    <span className="font-semibold">
                      {feedback?.Interview?.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Questions Asked
                    </span>
                    <span className="font-semibold">
                      {feedback?.Interview?.questions?.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths & Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-500">
                      <Award className="h-4 w-4" />
                      Strengths
                    </h4>

                    <div className="space-y-2 space-x-2">
                      {feedback?.strengths?.map((item) => (
                        <Badge
                          className="border-green-300 bg-green-100 text-xs"
                          key={item}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                    {feedback?.strengths?.length === 0 && (
                      <div className="text-muted-foreground text-sm italic">
                        No significant strengths identified in this interview.
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-destructive mb-3 flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-4 w-4" />
                      Priority Improvements
                    </h4>
                    {feedback?.improvements?.length === 0 && (
                      <div className="text-muted-foreground text-sm italic">
                        No significant improvements identified in this
                        interview.
                      </div>
                    )}
                    <div className="space-y-2 space-x-2">
                      {feedback?.improvements?.map((item) => (
                        <Badge
                          variant="destructive"
                          className="text-xs"
                          key={item}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
