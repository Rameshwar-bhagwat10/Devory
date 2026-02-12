'use client';

import SaveButton from './SaveButton';
import DownloadPDFButton from './DownloadPDFButton';
import SkillMatchCard from './SkillMatchCard';
import { Suspense } from 'react';

interface StickyActionPanelProps {
  projectId: string;
  projectSlug: string;
  difficulty: string;
  isSaved: boolean;
}

const DIFFICULTY_STYLES = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
  EXPERT: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
};

export default function StickyActionPanel({
  projectId,
  projectSlug,
  difficulty,
  isSaved,
}: StickyActionPanelProps) {
  return (
    <div className="sticky top-24 space-y-4">
      {/* Quick Actions Card */}
      <div className="bg-glass-5 border border-border-10 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
        <h3 className="text-sm font-bold text-text-90 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h3>
        
        <div className="space-y-3">
          {/* Save Button */}
          <div className="group">
            <SaveButton
              projectId={projectId}
              initialSaved={isSaved}
              variant="default"
              showLabel
            />
          </div>

          {/* Download PDF Button */}
          <DownloadPDFButton projectId={projectId} projectSlug={projectSlug} />
        </div>
      </div>

      {/* Skill Match Card */}
      <Suspense
        fallback={
          <div className="bg-glass-5 border border-border-10 rounded-2xl p-6 animate-pulse backdrop-blur-sm">
            <div className="h-32 bg-glass-10 rounded-xl"></div>
          </div>
        }
      >
        <SkillMatchCard projectId={projectId} />
      </Suspense>

      {/* Difficulty Badge Card */}
      <div className="bg-glass-5 border border-border-10 rounded-2xl p-5 backdrop-blur-sm shadow-lg">
        <div className="text-xs text-text-60 uppercase tracking-wider mb-3 font-semibold">Difficulty Level</div>
        <div className="flex items-center gap-2">
          <div className={`flex-1 px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wide text-center text-sm ${
            DIFFICULTY_STYLES[difficulty as keyof typeof DIFFICULTY_STYLES]
          }`}>
            {difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
