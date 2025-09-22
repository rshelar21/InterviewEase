import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Brain, Target, TrendingUp, Users, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description:
      'Get personalized feedback and coaching from our advanced AI that analyzes your responses in real-time.',
  },
  {
    icon: Target,
    title: 'Industry-Specific Prep',
    description:
      'Practice with questions tailored to your industry and role, from tech to finance to healthcare.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description:
      'Track your progress with detailed analytics and insights to identify areas for improvement.',
  },
  {
    icon: Users,
    title: 'Mock Interviews',
    description:
      'Practice with realistic mock interviews that simulate real interview conditions and scenarios.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description:
      'Receive immediate feedback on your answers, body language, and communication skills.',
  },
  {
    icon: Shield,
    title: 'Confidence Building',
    description:
      'Build confidence through repeated practice and positive reinforcement from our AI coach.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance sm:text-5xl">
            Everything you need to{' '}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            Our comprehensive platform provides all the tools and insights you
            need to master any interview.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
