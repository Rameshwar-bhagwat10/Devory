'use client';

import Link from 'next/link';
import { 
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiRust,
  SiSolidity,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiTensorflow,
  SiPytorch,
  SiDjango,
  SiFastapi,
  SiExpress,
  SiTailwindcss,
  SiBun,
  SiAstro,
  SiTauri,
  SiDeno,
  SiSolid,
  SiSvelte,
  SiRemix,
  SiScala,
  SiElixir,
  SiCplusplus,
  SiRuby,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import SaveButton from '@/components/projects/SaveButton';

interface ProjectCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  domain: string;
  techStack: string[];
  estimatedHours?: number;
  primaryTechnology?: string;
  isSaved?: boolean;
}

const DIFFICULTY_STYLES = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
  EXPERT: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
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

// Real tech icons with their actual brand colors
const getTechIcon = (tech?: string): { Icon: IconType; color: string } => {
  if (!tech) return { Icon: SiReact, color: '#61DAFB' };
  
  const techLower = tech.toLowerCase();
  
  // Modern Runtimes & Frameworks
  if (techLower.includes('bun')) return { Icon: SiBun, color: '#FBF0DF' };
  if (techLower.includes('astro')) return { Icon: SiAstro, color: '#FF5D01' };
  if (techLower.includes('tauri')) return { Icon: SiTauri, color: '#FFC131' };
  if (techLower.includes('deno')) return { Icon: SiDeno, color: '#70FFAF' }; // Changed from black to bright green
  if (techLower.includes('solid')) return { Icon: SiSolid, color: '#76B3E1' }; // Changed to lighter blue
  if (techLower.includes('qwik')) return { Icon: SiReact, color: '#AC7EF4' }; // Using React as fallback
  if (techLower.includes('htmx')) return { Icon: SiReact, color: '#3D72D7' }; // Using React as fallback
  if (techLower.includes('svelte')) return { Icon: SiSvelte, color: '#FF3E00' };
  if (techLower.includes('remix')) return { Icon: SiRemix, color: '#E8F5FD' }; // Changed from black to light blue
  if (techLower.includes('trpc')) return { Icon: SiReact, color: '#2596BE' }; // Using React as fallback
  if (techLower.includes('turborepo')) return { Icon: SiReact, color: '#EF4444' }; // Using React as fallback
  
  // Traditional Frameworks
  if (techLower.includes('react')) return { Icon: SiReact, color: '#61DAFB' };
  if (techLower.includes('next')) return { Icon: SiNextdotjs, color: '#FFFFFF' }; // Changed from black to white
  if (techLower.includes('vue')) return { Icon: SiVuedotjs, color: '#4FC08D' };
  if (techLower.includes('angular')) return { Icon: SiAngular, color: '#DD0031' };
  
  // Languages
  if (techLower.includes('python')) return { Icon: SiPython, color: '#3776AB' };
  if (techLower.includes('node')) return { Icon: SiNodedotjs, color: '#339933' };
  if (techLower.includes('typescript')) return { Icon: SiTypescript, color: '#3178C6' };
  if (techLower.includes('javascript')) return { Icon: SiJavascript, color: '#F7DF1E' };
  if (techLower.includes('go') || techLower === 'go') return { Icon: SiGo, color: '#00ADD8' };
  if (techLower.includes('rust')) return { Icon: SiRust, color: '#CE422B' }; // Changed from black to rust orange
  if (techLower.includes('java') && !techLower.includes('javascript')) return { Icon: SiJavascript, color: '#007396' }; // Using JS icon as fallback
  if (techLower.includes('kotlin')) return { Icon: SiKotlin, color: '#7F52FF' };
  if (techLower.includes('swift')) return { Icon: SiSwift, color: '#FA7343' };
  if (techLower.includes('c++')) return { Icon: SiCplusplus, color: '#00599C' };
  if (techLower.includes('c#')) return { Icon: SiReact, color: '#239120' }; // Using React as fallback
  if (techLower.includes('ruby')) return { Icon: SiRuby, color: '#CC342D' };
  if (techLower.includes('scala')) return { Icon: SiScala, color: '#DC322F' };
  if (techLower.includes('elixir')) return { Icon: SiElixir, color: '#4B275F' };
  if (techLower.includes('solidity')) return { Icon: SiSolidity, color: '#C0C0C0' }; // Changed from dark gray to silver
  
  // Mobile
  if (techLower.includes('flutter')) return { Icon: SiFlutter, color: '#02569B' };
  
  // Databases
  if (techLower.includes('mongo')) return { Icon: SiMongodb, color: '#47A248' };
  if (techLower.includes('postgres')) return { Icon: SiPostgresql, color: '#4169E1' };
  if (techLower.includes('mysql')) return { Icon: SiMysql, color: '#4479A1' };
  if (techLower.includes('redis')) return { Icon: SiRedis, color: '#DC382D' };
  if (techLower.includes('firebase')) return { Icon: SiFirebase, color: '#FFCA28' };
  
  // DevOps & Cloud
  if (techLower.includes('docker')) return { Icon: SiDocker, color: '#2496ED' };
  if (techLower.includes('kubernetes')) return { Icon: SiKubernetes, color: '#326CE5' };
  if (techLower.includes('aws')) return { Icon: SiAmazon, color: '#FF9900' };
  if (techLower.includes('azure')) return { Icon: SiReact, color: '#0078D4' }; // Using React as fallback
  if (techLower.includes('gcp') || techLower.includes('google cloud')) return { Icon: SiGooglecloud, color: '#4285F4' };
  
  // ML/AI
  if (techLower.includes('tensorflow')) return { Icon: SiTensorflow, color: '#FF6F00' };
  if (techLower.includes('pytorch')) return { Icon: SiPytorch, color: '#EE4C2C' };
  
  // Backend Frameworks
  if (techLower.includes('django')) return { Icon: SiDjango, color: '#0C4B33' }; // Changed to lighter green
  if (techLower.includes('fastapi')) return { Icon: SiFastapi, color: '#009688' };
  if (techLower.includes('express')) return { Icon: SiExpress, color: '#FFFFFF' }; // Changed from black to white
  
  // CSS
  if (techLower.includes('tailwind')) return { Icon: SiTailwindcss, color: '#06B6D4' };
  
  return { Icon: SiReact, color: '#61DAFB' };
};

export default function ProjectCard({
  id,
  slug,
  title,
  description,
  difficulty,
  domain,
  techStack,
  estimatedHours,
  primaryTechnology,
  isSaved = false,
}: ProjectCardProps) {
  const { Icon: TechIcon, color: iconColor } = getTechIcon(primaryTechnology);

  return (
    <div className="group relative h-full">
      {/* Save Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <SaveButton
          projectId={id}
          initialSaved={isSaved}
          variant="compact"
        />
      </div>

      <Link
        href={`/projects/${slug}`}
        scroll={false}
        onClick={() => {
          // Save current URL and scroll position before navigation
          sessionStorage.setItem('projectListUrl', window.location.href);
          sessionStorage.setItem('projectListScrollY', window.scrollY.toString());
        }}
        className="group block h-full relative overflow-hidden bg-dark-base/60 border border-border-10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-600/10 active:scale-[0.98] cursor-pointer backdrop-blur-sm"
      >
        {/* Subtle gradient overlay for default state */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.04] via-transparent to-cyan-500/[0.03] pointer-events-none"></div>
        
        {/* Bottom right corner gradient on hover - cyan to blue to purple */}
        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-tl from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/15 group-hover:via-blue-500/12 group-hover:to-purple-500/15 transition-all duration-500 pointer-events-none rounded-full blur-2xl"></div>
        
      {/* Content - Flex container to manage spacing */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Title with gradient on hover */}
        <h3 className="text-xl font-bold text-text-90 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-violet-400 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Description - Fixed height */}
        <p className="text-sm text-text-60 mb-4 line-clamp-3 leading-relaxed min-h-[4rem]">
          {description}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[2rem]">
          {/* Difficulty Badge */}
          <span
            className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wide ${
              DIFFICULTY_STYLES[difficulty]
            }`}
          >
            {difficulty}
          </span>

          {/* Domain Tag */}
          <span className="text-xs px-3 py-1 rounded border border-border-10 text-text-90 bg-glass-5">
            {DOMAIN_LABELS[domain] || domain}
          </span>

          {/* Duration */}
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

        {/* Primary Technology Badge with Real Icon */}
        {primaryTechnology && (
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-10 text-text-90 text-sm font-medium bg-glass-5">
              <TechIcon style={{ color: iconColor }} className="w-4 h-4" />
              <span>{primaryTechnology}</span>
            </div>
          </div>
        )}

        {/* Tech Stack - Only show if there are additional techs beyond primary */}
        {techStack.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded bg-glass-5 border border-border-10 text-text-60 hover:border-purple-500/30 hover:text-text-90 transition-all"
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
        )}
      </div>
      </Link>
    </div>
  );
}
