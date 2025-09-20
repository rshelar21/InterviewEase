import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  MoveRight,
  LoaderCircle,
  Brain,
  TrendingUp,
  Lightbulb,
  Target,
} from 'lucide-react';

interface InterviewEndedProps {
  isOpen: boolean;
}

const feedbackSteps = [
  {
    id: 1,
    title: 'Analyzing your responses',
    description: 'Processing your interview answers and communication patterns',
    icon: Brain,
  },
  {
    id: 2,
    title: 'Evaluating performance metrics',
    description: 'Assessing confidence, clarity, and technical accuracy',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Generating personalized insights',
    description: 'Creating tailored feedback based on your unique responses',
    icon: Lightbulb,
  },
  {
    id: 4,
    title: 'Crafting improvement recommendations',
    description: 'Developing actionable steps for your next interview',
    icon: Target,
  },
  {
    id: 5,
    title: 'Finalizing your report',
    icon: FileText,
    description: 'Compiling everything into a comprehensive feedback report',
  },
];

export const InterviewEndedDialog = ({ isOpen }: InterviewEndedProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="gap-0 sm:max-w-[450px]" showCloseButton={false}>
        <DialogHeader className="px-6 pb-4">
          <div className="text-center">
            <DialogTitle className="text-2xl">Generating Feedback</DialogTitle>
            <DialogDescription className="text-base">
              Our AI is analyzing your interview performance
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center pt-6">
          <LoaderCircle className="h-24 w-24 animate-spin" />
        </div>

        <div className="pt-4">
          <div className="mb-4 flex items-center gap-2">
            {/* <AirVent className="size-4" /> */}
            <h4 className="text-foreground font-medium">Processing Steps</h4>
            <MoveRight className="size-4" />
          </div>
          <div className="space-y-3">
            {feedbackSteps.map((step) => (
              <div
                key={step.id}
                className="bg-card flex animate-pulse items-center space-x-3 rounded-lg p-2.5 transition-all duration-300"
              >
                <div
                  className={`bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full`}
                >
                  <step.icon className="size-4" />
                  {/* React.createElement(step.icon, { className: 'w-4 h-4' }) */}
                </div>
                <span className={`text-muted-foreground text-sm`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
