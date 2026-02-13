'use client';

import Link from 'next/link';
import { getTechIcon } from '@/components/projects/TechIcon';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  domain: string;
  primaryTechnology: string;
  techStack: string[];
  matchScore: number;
}

interface RecommendationsGridProps {
  projects: Project[];
  userInterest: string;
}

const DIFFICULTY_COLORS = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
  EXPERT: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
};

export default function RecommendationsGrid({ projects, userInterest }: RecommendationsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-[#0f0f0f] border border-white/5 rounded-2xl">
        <p className="text-text-60">No recommendations available yet. Complete your profile to get personalized suggestions!</p>
      </div>
    );
  }

  // Show only first 3 projects
  const displayProjects = projects.slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold text-text-90">
            Personalized For You
          </h2>
        </div>
        <p className="text-text-60">
          Based on your interest in <span className="text-accent-orange font-medium">{userInterest}</span>
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayProjects.map((project, index) => {
          const { Icon: TechIcon, color: iconColor } = getTechIcon(project.primaryTechnology);
          
          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#141414] hover:border-white/10 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="p-6">
                {/* Difficulty Badge */}
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wide ${DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                    {project.difficulty}
                  </span>
                </div>

                {/* Tech Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <TechIcon style={{ color: iconColor }} className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-90 mb-3 group-hover:text-accent-orange transition-colors line-clamp-2 min-h-[3.5rem]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-60 mb-5 line-clamp-3 leading-relaxed min-h-[4rem]">
                  {project.description}
                </p>

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

                {/* Match Score */}
                <div className="flex items-center justify-between pt-4 border-t border-border-10">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-border-10"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 16}`}
                          strokeDashoffset={`${2 * Math.PI * 16 * (1 - project.matchScore / 100)}`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent-orange">{project.matchScore}%</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-text-60">Match</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm font-medium text-text-60 group-hover:text-accent-orange transition-colors">
                    <span>View</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* SVG Gradient Definition */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6b00" />
                    <stop offset="50%" stopColor="#ff006e" />
                    <stop offset="100%" stopColor="#ff0040" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
