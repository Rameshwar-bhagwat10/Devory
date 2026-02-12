'use client';

import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  url: string;
  variant?: 'default' | 'icon';
}

export default function ShareButton({ title, url, variant = 'default' }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      url,
    };

    try {
      // Try Web Share API first
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      // User cancelled or error occurred
      console.error('Share error:', error);
    }
  };

  const isIcon = variant === 'icon';

  return (
    <>
      <button
        onClick={handleShare}
        className={`
          group flex items-center gap-2 rounded-lg transition-all
          ${isIcon ? 'w-10 h-10 justify-center' : 'px-4 py-2.5'}
          bg-glass-5 border border-border-10 text-text-90
          hover:border-accent-orange hover:text-accent-orange hover:shadow-lg hover:shadow-accent-orange/10
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-accent-orange/30
        `}
        title="Share project"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {!isIcon && <span className="text-sm font-medium">Share</span>}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="bg-dark-base border-2 border-accent-orange rounded-lg px-6 py-3 shadow-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-text-90 font-medium">Link copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
