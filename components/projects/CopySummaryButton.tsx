'use client';

import { useState } from 'react';

interface CopySummaryButtonProps {
  title: string;
  description: string;
  domain: string;
  difficulty: string;
  techStack: string[];
}

export default function CopySummaryButton({
  title,
  description,
  domain,
  difficulty,
  techStack,
}: CopySummaryButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const summary = `
${title}

${description}

Domain: ${domain}
Difficulty: ${difficulty}
Tech Stack: ${techStack.join(', ')}
    `.trim();

    try {
      await navigator.clipboard.writeText(summary);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-sm text-text-60 hover:text-accent-orange transition-colors group"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="border-b border-transparent group-hover:border-accent-orange transition-colors">
          Copy Overview
        </span>
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="bg-dark-base border-2 border-accent-orange rounded-lg px-6 py-3 shadow-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-text-90 font-medium">Summary copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
