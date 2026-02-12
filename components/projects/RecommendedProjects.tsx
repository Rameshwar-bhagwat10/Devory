'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/common/ProjectCard';

interface RecommendedProjectsProps {
  projectId: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  domain: string;
  techStack: string[];
  estimatedHours?: number;
  primaryTechnology?: string;
}

export default function RecommendedProjects({ projectId }: RecommendedProjectsProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/projects/recommend?projectId=${projectId}`);
        
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.data.recommendations);
          // If no recommendations, might need onboarding
          if (data.data.recommendations.length === 0) {
            setNeedsOnboarding(true);
          }
        } else if (response.status === 404) {
          // User profile not found - needs onboarding
          setNeedsOnboarding(true);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [projectId, session, status]);

  // Don't show section if not authenticated
  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-glass-10 border border-border-10 rounded-xl p-6 animate-pulse">
              <div className="h-32 bg-glass-5 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (needsOnboarding || recommendations.length === 0) {
    return (
      <section className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Recommended For You</h2>
        </div>
        <div className="bg-glass-5 border border-border-10 rounded-xl p-8 text-center space-y-4">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-text-90 font-medium">
            Get Personalized Recommendations
          </p>
          <p className="text-text-60 text-sm">
            Complete your profile to receive project recommendations tailored to your interests and skill level.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="mt-4 px-6 py-3 bg-accent-orange text-white rounded-lg hover:bg-accent-orange/90 transition-colors font-medium"
          >
            Complete Profile
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Recommended For You</h2>
        <span className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-sm rounded-full font-medium">
          Personalized
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
