'use client';

import Link from 'next/link';
import { getTechIcon } from '@/components/projects/TechIcon';

interface SavedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  domain: string;
  primaryTechnology: string;
  techStack: string[];
  savedAt: Date;
}

interface SavedPreviewProps {
  projects: SavedProject[];
  totalSaved: number;
}

const DIFFICULTY_COLORS = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
  EXPERT: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
};

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
}

export default function SavedPreview({ projects, totalSaved }: SavedPreviewProps) {
  if (projects.length === 0) {
    return (
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-text-90">
              Recently Saved
            </h2>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16 bg-[#0f0f0f] border border-white/5 rounded-2xl">
          <svg className="w-16 h-16 mx-auto mb-4 text-text-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <h3 className="text-xl font-bold text-text-90 mb-2">No saved projects yet</h3>
          <p className="text-text-60 mb-6">Start exploring and save projects that interest you</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:scale-105 transition-all"
          >
            <span>Explore Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-text-90">
              Recently Saved
            </h2>
          </div>
          <p className="text-text-60">Your bookmarked project ideas</p>
        </div>
        <Link
          href="/saved"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0f0f0f] rounded-lg text-text-90 hover:bg-[#141414] hover:text-accent-orange transition-all group"
        >
          <span className="text-sm font-medium">View All ({totalSaved})</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const { Icon: TechIcon, color: iconColor } = getTechIcon(project.primaryTechnology);
          
          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#141414] hover:border-white/10 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="p-6">
                {/* Difficulty Badge & Saved Indicator */}
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wide ${DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                    {project.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-accent-orange">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>

                {/* Tech Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <TechIcon style={{ color: iconColor }} className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-90 mb-3 group-hover:text-accent-orange transition-colors line-clamp-2 min-h-[3.5rem]">
                  {project.title}
                </h3>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5 min-h-[2rem]">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-2.5 py-1 rounded-md bg-glass-5 text-text-60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Saved Time */}
                <div className="flex items-center justify-between pt-4 border-t border-border-10">
                  <div className="flex items-center gap-1.5 text-xs text-text-60">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Saved {getTimeAgo(project.savedAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm font-medium text-text-60 group-hover:text-accent-orange transition-colors">
                    <span>View</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-6 text-center">
        <Link
          href="/saved"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:scale-105 transition-all"
        >
          <span>View All Saved ({totalSaved})</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
