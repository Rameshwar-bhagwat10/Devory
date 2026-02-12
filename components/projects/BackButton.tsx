'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    const savedUrl = sessionStorage.getItem('projectListUrl');
    const savedScrollY = sessionStorage.getItem('projectListScrollY');

    if (savedUrl) {
      // Extract just the path and query from the saved URL
      const url = new URL(savedUrl);
      const pathWithQuery = url.pathname + url.search;
      
      // Navigate to the saved URL to preserve pagination state
      router.push(pathWithQuery);
      
      // Restore scroll position after navigation
      if (savedScrollY) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScrollY),
            behavior: 'instant' as ScrollBehavior,
          });
        }, 100);
      }
      
      // Don't clean up immediately - let the scroll restoration happen first
      setTimeout(() => {
        sessionStorage.removeItem('projectListUrl');
        sessionStorage.removeItem('projectListScrollY');
      }, 500);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/projects');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-glass-5 border border-border-10 text-text-60 hover:text-accent-orange hover:border-accent-orange transition-all group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Back to Projects</span>
    </button>
  );
}
