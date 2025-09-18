import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="from-primary to-accent bg-gradient-to-r py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-balance text-white sm:text-5xl">
            Ready to land your dream job?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-balance text-white/90">
            Join thousands of professionals who have successfully transformed
            their interview skills with InterviewEase.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 text-lg font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="hover:text-primary border-white bg-transparent px-8 py-3 text-lg text-white hover:bg-white"
            >
              Contact Sales
            </Button> */}
          </div>
          <p className="mt-6 text-sm text-white/70">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
