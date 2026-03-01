import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXTAUTH_URL || 'https://devory.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Devory — AI Powered Project Ideas Platform',
    template: '%s | Devory',
  },
  description: 'Discover AI-curated project ideas with structured roadmaps, tech stacks, and implementation guides. Perfect for developers seeking their next challenge.',
  applicationName: 'Devory',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'project ideas',
    'developer projects',
    'coding projects',
    'AI project generator',
    'software development',
    'programming ideas',
    'tech stack',
    'project roadmap',
    'developer community',
  ],
  authors: [{ name: 'Devory', url: baseUrl }],
  creator: 'Devory',
  publisher: 'Devory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Devory',
    title: 'Devory — AI Powered Project Ideas Platform',
    description: 'Discover AI-curated project ideas with structured roadmaps, tech stacks, and implementation guides.',
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
    site: '@devory',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        {/* TODO: After setting up Google Search Console, uncomment and add your verification code */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> */}
        
        {/* Google Analytics - Add your GA4 Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Bing Webmaster Tools Verification - Optional */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_CODE_HERE" /> */}
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch for faster external resource loading */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Devory',
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              description: 'AI-powered project ideas platform for developers',
              sameAs: [
                'https://twitter.com/devory',
                'https://github.com/devory',
                'https://linkedin.com/company/devory',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'support@devory.com',
              },
            }),
          }}
        />
        {/* JSON-LD Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Devory',
              url: baseUrl,
              description: 'AI-powered project ideas platform with structured roadmaps and implementation guides',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${baseUrl}/projects?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
