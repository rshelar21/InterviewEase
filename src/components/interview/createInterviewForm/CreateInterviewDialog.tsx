'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  Building2,
  Briefcase,
  FileText,
  Sparkles,
  MoveRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import {
  MAX_FORM_STEPS,
  FORM_FIRST_FORM_SCHEMA,
  FORM_SECOND_FORM_SCHEMA,
  FORM_THIRD_FORM_SCHEMA,
  FORM_STEPS,
} from './createInterviewForm.utils';
import { createInterview, updateInterview } from '@/actions';
import { useFormStatus } from 'react-dom';
import { Interview } from '@/types';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface CreateInterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Interview | null;
}

export function CreateInterviewDialog({
  isOpen,
  onClose,
  data,
}: CreateInterviewDialogProps) {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  // const [state, formAction, isPending] = useActionState(createInterview, undefined)
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(
      currentStep === 1
        ? FORM_FIRST_FORM_SCHEMA
        : currentStep === 2
          ? FORM_SECOND_FORM_SCHEMA
          : FORM_THIRD_FORM_SCHEMA
    ),
    defaultValues: {
      title: '',
      companyName: '',
      jobDescription: '',
      description: '',
      difficulty: 'ENTRY_LEVEL',
      interviewType: 'TECHNICAL',
      scheduledDate: new Date(),
      scheduleLater: false,
      status: 'DRAFT',
    },
  });

  useEffect(() => {
    if (data?.id) {
      form.reset({
        title: data?.title,
        companyName: data?.companyName,
        jobDescription: data?.jobDescription,
        description: data?.description,
        difficulty: data?.difficulty,
        interviewType: data?.interviewType,
        scheduledDate: data?.scheduledDate || new Date(),
        scheduleLater: data?.scheduleLater,
        status: data?.status,
      });
    }
  }, [data]);

  const watchScheduleLater = form.watch('scheduleLater');

  const handleClose = (): void => {
    setCurrentStep(1);
    onClose();
    form.reset();
    form.clearErrors();
  };

  const onSubmit = async (): Promise<void> => {
    if (currentStep !== MAX_FORM_STEPS) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    try {
      if (data?.id) {
        await updateInterview(data?.id, form.getValues() as Interview);
        toast.success('Interview Details Updated!');
      } else {
        await createInterview(form.getValues() as Interview);
        toast.success('Interview Created Successfuly!');
      }
      queryClient.invalidateQueries({
        queryKey: ['interview'],
      });
      handleClose();
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto px-0 sm:max-w-[600px]">
        <DialogHeader className="space-y-4 px-6 pb-4">
          <div>
            <DialogTitle className="text-2xl">Create New Interview</DialogTitle>
            <DialogDescription className="text-base">
              Set up your interview preparation session with AI-powered insights
            </DialogDescription>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {FORM_STEPS?.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                    currentStep >= step.number
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      currentStep >= step.number
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-4 h-0.5 w-12 transition-all',
                      currentStep > step.number
                        ? 'bg-primary'
                        : 'bg-muted-foreground/30'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <Separator />
        <div className="px-6 pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Senior Frontend Developer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Company Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. TechCorp Inc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Job Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the full job description here. This helps our AI generate relevant interview questions and preparation materials..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The more detailed, the better our AI can prepare you
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Interview Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interview Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any specific notes about this interview, preparation focus areas, or special requirements..."
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Personal notes to help you prepare effectively
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="interviewType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interview Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="TECHNICAL">
                                  Technical
                                </SelectItem>
                                <SelectItem value="BEHAVIORAL">
                                  Behavioral
                                </SelectItem>
                                <SelectItem value="SYSTEM_DESIGN">
                                  System Design
                                </SelectItem>
                                {/* <SelectItem value="portfolio">
                              Portfolio Review
                              </SelectItem> */}
                                {/* <SelectItem value="case-study">
                              Case Study
                              </SelectItem> */}
                                <SelectItem value="cultural-fit">
                                  Cultural Fit
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ENTRY_LEVEL">
                                  Entry Level
                                </SelectItem>
                                <SelectItem value="MID_LEVEL">
                                  Mid Level
                                </SelectItem>
                                <SelectItem value="SENIOR">Senior</SelectItem>
                                <SelectItem value="PRINCIPAL">
                                  Principal/Staff
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg border p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Sparkles className="text-primary h-4 w-4" />
                      AI Preparation Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Custom Questions</Badge>
                      <Badge variant="secondary">Mock Interviews</Badge>
                      <Badge variant="secondary">Performance Analytics</Badge>
                      <Badge variant="secondary">Industry Insights</Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Scheduling */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="scheduleLater"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-medium">
                            Schedule for Later
                          </FormLabel>
                          <FormDescription>
                            Set a specific date and time for this interview
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {watchScheduleLater && (
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Interview Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Choose when you want to conduct this interview
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
                    <h4 className="text-primary mb-2 font-medium">
                      Ready to Start?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Once created, you &apos;ll get access to AI-generated
                      questions, practice sessions, and personalized feedback to
                      help you ace this interview.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <div className="flex w-full justify-end gap-2">
                  {currentStep === 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="bg-transparent"
                      size="lg"
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="bg-transparent"
                      size="lg"
                    >
                      Back
                    </Button>
                  )}

                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    size="lg"
                    disabled={pending}
                  >
                    {currentStep !== MAX_FORM_STEPS ? 'Next' : 'Create'}

                    {currentStep !== MAX_FORM_STEPS ? (
                      <MoveRight className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
