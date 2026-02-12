'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SavedProjectCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  domain: string;
  techStack: string[];
  estimatedHours?: number;
  savedAt: Date;
}

const DIFFICULTY_STYLES = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
};

const DOMAIN_LABELS: Record<string, string> = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  DATA_SCIENCE: 'Data Science',
  MACHINE_LEARNING: 'Machine Learning',
  BLOCKCHAIN: 'Blockchain',
  IOT: 'IoT',
  GAME_DEVELOPMENT: 'Game Development',
  CYBERSECURITY: 'Cybersecurity',
  CLOUD_COMPUTING: 'Cloud Computing',
  OTHER: 'Other',
};

export default function SavedProjectCard({
  id,
  slug,
  title,
  description,
  difficulty,
  domain,
  techStack,
  estimatedHours,
  savedAt,
}: SavedProjectCardProps) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsRemoving(true);

    try {
      const response = await fetch(`/api/projects/save?projectId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Remove error:', error);
      setIsRemoving(false);
      setShowConfirm(false);
    }
  };

  const savedDate = new Date(savedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group relative h-full bg-glass-10 border border-border-10 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-accent-orange hover:shadow-lg hover:shadow-accent-orange/10">
      <Link href={`/projects/${slug}`} className="block h-full">
        <div className="h-full flex flex-col">
          {/* Saved Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-60">Saved {savedDate}</span>
            
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-all
                ${showConfirm
                  ? 'bg-red-500/10 border-2 border-red-500 text-red-500'
                  : 'bg-glass-5 border border-border-10 text-text-60 hover:border-red-500 hover:text-red-500'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={showConfirm ? 'Click again to confirm' : 'Remove from saved'}
            >
              {isRemoving ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Title - Fixed height */}
          <h3 className="text-xl font-bold text-text-90 mb-3 line-clamp-2 group-hover:text-accent-orange transition-colors min-h-[3.5rem]">
            {title}
          </h3>

          {/* Description - Fixed height */}
          <p className="text-sm text-text-60 mb-4 line-clamp-3 leading-relaxed min-h-[4rem]">
            {description}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[2rem]">
            <span
              className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wide ${
                DIFFICULTY_STYLES[difficulty]
              }`}
            >
              {difficulty}
            </span>

            <span className="text-xs px-3 py-1 rounded border border-border-10 text-text-90 bg-glass-5">
              {DOMAIN_LABELS[domain] || domain}
            </span>

            {estimatedHours && (
              <span className="text-xs px-3 py-1 rounded border border-border-10 text-text-60 bg-glass-5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {estimatedHours}h
              </span>
            )}
          </div>

          {/* Spacer to push tech stack to bottom */}
          <div className="flex-grow"></div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded bg-glass-5 border border-border-10 text-text-60 hover:border-accent-orange/30 hover:text-text-90 transition-all"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded bg-glass-5 border border-border-10 text-text-60">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
