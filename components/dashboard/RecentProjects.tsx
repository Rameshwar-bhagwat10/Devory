'use client';

import Link from 'next/link';
import { getTechIcon } from '@/components/projects/TechIcon';

interface RecentProject {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  domain: string;
  primaryTechnology: string;
  viewedAt: Date;
}

interface RecentProjectsProps {
  projects: RecentProject[];
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold text-text-90">
            Continue Exploring
          </h2>
        </div>
        <p className="text-text-60">Pick up where you left off</p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-base to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-base to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable container */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2">
            {projects.map((project, index) => {
              const { Icon: TechIcon, color: iconColor } = getTechIcon(project.primaryTechnology);
              
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group relative flex-shrink-0 w-64 bg-[#0f0f0f] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#141414] opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="p-5">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-sm shadow-purple-600/10">
                      <TechIcon style={{ color: iconColor }} className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-text-90 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-violet-400 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-colors min-h-[3rem]">
                      {project.title}
                    </h3>

                    {/* Time ago */}
                    <div className="flex items-center gap-1.5 text-xs text-text-60 mb-4">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{getTimeAgo(project.viewedAt)}</span>
                    </div>

                    {/* Resume button */}
                    <div className="flex items-center justify-between pt-4 border-t border-border-10">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                        Resume
                      </span>
                      <svg className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

