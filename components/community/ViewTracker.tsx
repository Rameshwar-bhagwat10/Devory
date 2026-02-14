'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  postSlug: string;
}

export default function ViewTracker({ postSlug }: ViewTrackerProps) {
  useEffect(() => {
    // Track view after 3 seconds (to avoid counting quick bounces)
    const timer = setTimeout(async () => {
      try {
        await fetch(`/api/community/${postSlug}/view`, {
          method: 'POST',
        });
      } catch (error) {
        // Silently fail - view tracking is not critical
        console.error('Failed to track view:', error);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [postSlug]);
  
  return null;
}
