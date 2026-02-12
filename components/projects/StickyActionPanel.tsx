'use client';

import { useState, useEffect } from 'react';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';
import Link from 'next/link';

interface StickyActionPanelProps {
  projectId: string;
  projectTitle: string;
  projectSlug: string;
  initialSaved: boolean;
}

export default function StickyActionPanel({
  projectId,
  projectTitle,
  projectSlug,
  initialSaved,
}: StickyActionPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show panel after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/projects/${projectSlug}`;

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div
        className={`
          hidden lg:block fixed top-24 right-8 w-72 z-40 transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="bg-glass-5 backdrop-blur-sm border border-border-10 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-text-90 uppercase tracking-wider mb-4">
            Quick Actions
          </h3>

          {/* Primary Action */}
          <Link
            href={`/projects/${projectSlug}`}
            className="block w-full px-6 py-3 bg-gradient-primary text-white font-bold rounded-lg text-center transition-all hover:scale-102 hover:shadow-lg hover:shadow-accent-orange/30 focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
          >
            Start This Project
          </Link>

          {/* Secondary Actions */}
          <div className="space-y-3">
            <SaveButton
              projectId={projectId}
              initialSaved={initialSaved}
              variant="default"
              showLabel
            />

            <ShareButton
              title={projectTitle}
              url={projectUrl}
              variant="default"
            />
          </div>

          <div className="pt-4 border-t border-border-10">
            <p className="text-xs text-text-60 leading-relaxed">
              Save this project to access it later from your dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div
        className={`
          lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="bg-dark-base/95 backdrop-blur-md border-t border-border-10 px-4 py-3 safe-area-bottom">
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${projectSlug}`}
              className="flex-1 px-6 py-3 bg-gradient-primary text-white font-bold rounded-lg text-center transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
            >
              Start Project
            </Link>

            <SaveButton
              projectId={projectId}
              initialSaved={initialSaved}
              variant="compact"
            />

            <ShareButton
              title={projectTitle}
              url={projectUrl}
              variant="icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}
