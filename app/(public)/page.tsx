import dynamicImport from 'next/dynamic';
import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import SectionDivider from '@/components/landing/SectionDivider';
import SEOContent from '@/components/landing/SEOContent';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import WebsiteSchema from '@/components/seo/WebsiteSchema';

// Static generation configuration for home page
export const revalidate = 3600; // 1 hour cache
export const dynamic = 'force-static'; // Force static generation at build time

// Lazy load sections below the fold for better performance
const ChallengeSection = dynamicImport(() => import('@/components/landing/ChallengeSection'), {
  loading: () => <div className="py-32" />,
});
const CapabilitiesSection = dynamicImport(() => import('@/components/landing/CapabilitiesSection'), {
  loading: () => <div className="py-32" />,
});
const HowItWorksSection = dynamicImport(() => import('@/components/landing/HowItWorksSection'), {
  loading: () => <div className="py-32" />,
});
const TrustSection = dynamicImport(() => import('@/components/landing/TrustSection'), {
  loading: () => <div className="py-32" />,
});
const FinalCTASection = dynamicImport(() => import('@/components/landing/FinalCTASection'), {
  loading: () => <div className="py-32" />,
});

export const metadata: Metadata = {
  title: 'Devory — AI Powered Project Ideas Platform',
  description: 'Discover 300+ curated project ideas with AI-powered roadmaps, tech stacks, and implementation guides. Perfect for developers, students, and entrepreneurs.',
  keywords: [
    'project ideas',
    'AI powered projects',
    'developer projects',
    'coding projects',
    'software development',
    'tech stack',
    'project roadmap',
    'implementation guide',
    'student projects',
    'portfolio projects',
    'open source',
    'web development',
    'mobile development',
    'machine learning projects',
  ],
  authors: [{ name: 'Devory' }],
  creator: 'Devory',
  publisher: 'Devory',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://devory.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Devory — AI Powered Project Ideas Platform',
    description: 'Discover 300+ curated project ideas with AI-powered roadmaps, tech stacks, and implementation guides. Perfect for developers, students, and entrepreneurs.',
    siteName: 'Devory',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devory - AI Powered Project Ideas Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devory — AI Powered Project Ideas Platform',
    description: 'Discover 300+ curated project ideas with AI-powered roadmaps, tech stacks, and implementation guides.',
    images: ['/og-image.png'],
    creator: '@devory',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function LandingPage() {
  return (
    <>
      {/* SEO Structured Data */}
      <OrganizationSchema />
      <WebsiteSchema />
      
      <div className="min-h-screen relative bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
        {/* Premium Cinematic Hero Section */}
        <Hero />

      {/* Divider */}
      <SectionDivider variant="glow" />

      {/* Challenge Section */}
      <ChallengeSection />

      {/* Divider */}
      <SectionDivider variant="gradient" />

      {/* SEO Content Section - Keyword Rich */}
      <SEOContent />

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
    </>
  );
}

