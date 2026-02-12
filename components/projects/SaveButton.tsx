'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SaveButtonProps {
  projectId: string;
  initialSaved: boolean;
  variant?: 'default' | 'compact';
  showLabel?: boolean;
}

export default function SaveButton({ 
  projectId, 
  initialSaved, 
  variant = 'default',
  showLabel = false 
}: SaveButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      const currentUrl = window.location.pathname;
      router.push(`/auth?callbackUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    // Optimistic update
    const previousState = isSaved;
    setIsSaved(!isSaved);
    setIsLoading(true);

    try {
      // Toggle save (API handles both save and unsave)
      const response = await fetch('/api/projects/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle save');
      }

      const data = await response.json();
      setIsSaved(data.data.saved);
    } catch (error) {
      console.error('Save toggle error:', error);
      // Revert on error
      setIsSaved(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  const isCompact = variant === 'compact';

  return (
    <button
      onClick={handleToggleSave}
      disabled={isLoading}
      className={`
        group relative flex items-center gap-2.5 rounded-xl transition-all duration-300
        ${isCompact ? 'w-10 h-10 justify-center' : 'w-full px-5 py-3'}
        ${isSaved
          ? 'bg-gradient-to-r from-accent-orange to-accent-pink text-white shadow-lg shadow-accent-orange/25 border-2 border-transparent'
          : 'bg-glass-5 border-2 border-border-10 text-text-90 hover:border-accent-orange/50 hover:bg-glass-10'
        }
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-accent-orange/30 focus:ring-offset-2 focus:ring-offset-dark-base
      `}
      title={isSaved ? 'Remove from saved' : 'Save project'}
    >
      {/* Animated gradient overlay on hover for unsaved state */}
      {!isSaved && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/10 to-accent-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      )}
      
      {/* Content */}
      <div className="relative flex items-center gap-2.5">
        {isSaved ? (
          <svg className={`${isCompact ? 'w-5 h-5' : 'w-5 h-5'} animate-pop`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        ) : (
          <svg className={`${isCompact ? 'w-5 h-5' : 'w-5 h-5'} group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
        {showLabel && !isCompact && (
          <span className="text-sm font-semibold">
            {isSaved ? 'Saved' : 'Save Project'}
          </span>
        )}
      </div>
    </button>
  );
}
