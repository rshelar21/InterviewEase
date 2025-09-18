import {
  CTASection,
  FeaturesSection,
  HeroSection,
  LandingFooter,
  LandingPageHeader,
  PricingSection,
  TestimonialsSection,
} from '@/components/landing';

export default async function Home() {
  return (
    <div className="bg-background dark min-h-screen">
      <LandingPageHeader />
      <main>
        <HeroSection />
        {/* <SocialProofSection /> */}
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
