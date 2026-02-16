import dynamic from 'next/dynamic';
import Hero from '@/components/landing/Hero';
import SectionDivider from '@/components/landing/SectionDivider';

// Lazy load sections below the fold for better performance
const ChallengeSection = dynamic(() => import('@/components/landing/ChallengeSection'), {
  loading: () => <div className="py-32" />,
});
const AIIntelligenceSection = dynamic(() => import('@/components/landing/AIIntelligenceSection'), {
  loading: () => <div className="py-32" />,
});
const CapabilitiesSection = dynamic(() => import('@/components/landing/CapabilitiesSection'), {
  loading: () => <div className="py-32" />,
});
const HowItWorksSection = dynamic(() => import('@/components/landing/HowItWorksSection'), {
  loading: () => <div className="py-32" />,
});
const TrustSection = dynamic(() => import('@/components/landing/TrustSection'), {
  loading: () => <div className="py-32" />,
});
const FinalCTASection = dynamic(() => import('@/components/landing/FinalCTASection'), {
  loading: () => <div className="py-32" />,
});

export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
      {/* Premium Cinematic Hero Section */}
      <Hero />

      {/* Divider */}
      <SectionDivider variant="glow" />

      {/* Challenge Section */}
      <ChallengeSection />

      {/* Divider */}
      <SectionDivider variant="gradient" />

      {/* AI Intelligence Solution Section */}
      <AIIntelligenceSection />

      {/* Divider */}
      <SectionDivider variant="dots" />

      {/* Capabilities Section */}
      <CapabilitiesSection />

      {/* Divider */}
      <SectionDivider variant="wave" />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Divider */}
      <SectionDivider variant="gradient" />

      {/* Trust Section */}
      <TrustSection />

      {/* Divider */}
      <SectionDivider variant="glow" />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}

