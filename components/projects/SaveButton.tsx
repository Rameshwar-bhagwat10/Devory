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
      router.push('/auth');
      return;
    }

    // Optimistic update
    const previousState = isSaved;
    setIsSaved(!isSaved);
    setIsLoading(true);

    try {
      if (isSaved) {
        // Unsave
        const response = await fetch(`/api/projects/save?projectId=${projectId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to unsave');
        }
      } else {
        // Save
        const response = await fetch('/api/projects/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        });

        if (!response.ok) {
          throw new Error('Failed to save');
        }
      }
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
        group flex items-center gap-2 rounded-full transition-all
        ${isCompact ? 'w-9 h-9 justify-center' : 'px-4 py-2'}
        ${isSaved
          ? 'bg-accent-orange/10 border-2 border-accent-orange text-accent-orange shadow-lg shadow-accent-orange/20'
          : 'bg-glass-5 border border-border-10 text-text-90 hover:border-accent-orange/50'
        }
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent-orange/30
      `}
      title={isSaved ? 'Remove from saved' : 'Save project'}
    >
      {isSaved ? (
        <svg className={`${isCompact ? 'w-5 h-5' : 'w-4 h-4'} ${isSaved ? 'animate-pop' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ) : (
        <svg className={`${isCompact ? 'w-5 h-5' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
      {showLabel && !isCompact && (
        <span className="text-sm font-medium">
          {isSaved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
