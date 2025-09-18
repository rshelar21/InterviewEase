import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="from-background to-background relative overflow-hidden bg-gradient-to-br via-[#1a1a22]/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(120,119,198,0.05)_50%,transparent_70%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,247,250,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,247,250,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] bg-[size:20px_20px]" />

      <div className="relative container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-[#2a2a35] bg-[#1F1F23] px-4 py-2 text-sm font-medium text-[#f5f7fa] hover:bg-[#2a2a35]"
          >
            <Star className="mr-2 h-4 w-4 fill-[#c3c8d1] text-[#c3c8d1]" />
            Trusted by 10,000+ professionals
          </Badge>

          <h1 className="mb-6 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#f5f7fa] to-[#c3c8d1] bg-clip-text text-transparent">
              Ace Your Interview with{' '}
            </span>
            <span className="animate-gradient-x bg-gradient-to-r from-[#7877c6] via-[#9b59b6] to-[#e74c3c] bg-clip-text text-transparent">
              AI-Powered Insights
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-balance text-[#c3c8d1]">
            Transform your interview skills with personalized AI coaching,
            real-time feedback, and proven strategies that land you your dream
            job.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              className="border-[#2a2a35] bg-[#1F1F23] px-8 py-3 text-lg text-[#f5f7fa] hover:border-[#3a3a45] hover:bg-[#2a2a35]"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button> */}
          </div>

          <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-between gap-4 md:gap-0">
            <div className="text-center">
              <div className="mb-2 bg-gradient-to-r from-[#7877c6] to-[#9b59b6] bg-clip-text text-4xl font-bold text-transparent">
                95%
              </div>
              <div className="text-sm text-[#64748b]">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-2 bg-gradient-to-r from-[#7877c6] to-[#9b59b6] bg-clip-text text-4xl font-bold text-transparent">
                50K+
              </div>
              <div className="text-sm text-[#64748b]">Interviews</div>
            </div>
            <div className="text-center">
              <div className="mb-2 bg-gradient-to-r from-[#7877c6] to-[#9b59b6] bg-clip-text text-4xl font-bold text-transparent">
                4.9★
              </div>
              <div className="text-sm text-[#64748b]">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative container mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <img
          src="/assets/images/interview-page.png"
          alt="Dashboard Mockup"
          className="-rotate-6 skew-x-6 transform rounded-2xl shadow-2xl transition-transform duration-700 hover:rotate-0 hover:skew-x-0"
        />
      </div> */}

      <div className="relative container mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <Image
          src="/assets/images/interview-page.png"
          alt="Dashboard Mockup"
          width={1200}
          height={800}
          className="-rotate-6 skew-x-6 transform rounded-2xl shadow-2xl transition-transform duration-700 hover:rotate-0 hover:skew-x-0"
          priority
        />
      </div>
    </section>
  );
}
