import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  return (
    <section className="from-background to-muted/20 relative bg-gradient-to-b py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            <Zap className="mr-2 h-4 w-4" />
            100% Free Forever
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
            Your Free AI{' '}
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Interview Coach
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-balance sm:text-2xl">
            Master your next interview with AI-powered mock interviews,
            personalized feedback, and industry-specific questions. No hidden
            fees, no subscriptions—just results.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
            >
              Start Practicing Now
            </Button> */}
            <Link href="/login">
              <Button
                size="lg"
                className="border-0 bg-gradient-to-r from-[#7877c6] to-[#9b59b6] px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-[#7877c6]/25 hover:from-[#6b6ab8] hover:to-[#8e4ec6]"
              >
                Start Practicing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <Button
              variant="outline"
              size="lg"
              className="bg-transparent px-8 py-3 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button> */}
          </div>

          {/* Social Proof */}
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm">4.9/5 from 10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">50,000+ interviews completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
