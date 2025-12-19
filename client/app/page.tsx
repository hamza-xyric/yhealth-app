import { MainLayout } from "@/components/layout";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  AIAppFlowSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  IntegrationsSection,
  AppDownloadSection,
  FAQSection,
  CTASection,
} from "@/components/landing";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIAppFlowSection />
      <StatsSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <PricingSection />
      <AppDownloadSection />
      <FAQSection />
      <CTASection />
    </MainLayout>
  );
}
