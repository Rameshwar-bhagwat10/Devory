'use client';

import { useState, useCallback, useEffect, useTransition, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/common/ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import FilterDropdown from './FilterDropdown';
import ActiveFilters from './ActiveFilters';
import Pagination from './Pagination';
import type { Project } from '@/features/projects/project.types';

interface ProjectsClientProps {
  initialProjects: Project[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
}

// Cache for storing projects data to prevent re-fetching
const projectsCache = new Map<string, {
  projects: Project[];
  total: number;
  totalPages: number;
  timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ProjectsClientProps {
  initialProjects: Project[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
}

const DOMAIN_OPTIONS = [
  { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
  { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Development' },
  { value: 'BACKEND_DEVELOPMENT', label: 'Backend Development' },
  { value: 'DESKTOP_DEVELOPMENT', label: 'Desktop Development' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'DATA_SCIENCE', label: 'Data Science' },
  { value: 'MACHINE_LEARNING', label: 'Machine Learning' },
  { value: 'AI_ML', label: 'AI & ML' },
  { value: 'AI', label: 'AI' },
  { value: 'BLOCKCHAIN', label: 'Blockchain' },
  { value: 'IOT', label: 'IoT' },
  { value: 'GAME_DEVELOPMENT', label: 'Game Development' },
  { value: 'CYBERSECURITY', label: 'Cybersecurity' },
  { value: 'CLOUD_COMPUTING', label: 'Cloud Computing' },
  { value: 'FINTECH', label: 'FinTech' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'HEALTH_TECH', label: 'Health Tech' },
  { value: 'ENTERPRISE_SYSTEM', label: 'Enterprise System' },
  { value: 'EDTECH', label: 'EdTech' },
  { value: 'DEVELOPER_TOOLS', label: 'Developer Tools' },
  { value: 'AR_VR', label: 'AR/VR' },
  { value: 'ROBOTICS', label: 'Robotics' },
  { value: 'COMPUTER_VISION', label: 'Computer Vision' },
  { value: 'ENERGY', label: 'Energy' },
  { value: 'QUANTUM', label: 'Quantum' },
  { value: 'BIOINFORMATICS', label: 'Bioinformatics' },
  { value: 'ENVIRONMENTAL', label: 'Environmental' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' },
];

const TECH_STACK_OPTIONS = [
  // Frontend Frameworks
  { value: 'React', label: 'React' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'SvelteKit', label: 'SvelteKit' },
  { value: 'SolidJS', label: 'SolidJS' },
  { value: 'Solid Start', label: 'Solid Start' },
  { value: 'Remix', label: 'Remix' },
  { value: 'Astro', label: 'Astro' },
  { value: 'Qwik', label: 'Qwik' },
  { value: 'Preact', label: 'Preact' },
  { value: 'Alpine.js', label: 'Alpine.js' },
  { value: 'HTMX', label: 'HTMX' },
  
  // Mobile
  { value: 'React Native', label: 'React Native' },
  { value: 'Flutter', label: 'Flutter' },
  { value: 'Swift', label: 'Swift' },
  { value: 'SwiftUI', label: 'SwiftUI' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Jetpack Compose', label: 'Jetpack Compose' },
  { value: 'Expo', label: 'Expo' },
  
  // Backend
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express', label: 'Express' },
  { value: 'Python', label: 'Python' },
  { value: 'FastAPI', label: 'FastAPI' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Django', label: 'Django' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Java', label: 'Java' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'C#', label: 'C#' },
  { value: 'ASP.NET Core', label: 'ASP.NET Core' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Rails', label: 'Rails' },
  { value: 'Elixir', label: 'Elixir' },
  { value: 'Phoenix', label: 'Phoenix' },
  { value: 'Deno', label: 'Deno' },
  { value: 'Bun', label: 'Bun' },
  
  // Databases
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'Redis', label: 'Redis' },
  { value: 'SQLite', label: 'SQLite' },
  { value: 'Firestore', label: 'Firestore' },
  { value: 'DynamoDB', label: 'DynamoDB' },
  { value: 'Cassandra', label: 'Cassandra' },
  { value: 'Elasticsearch', label: 'Elasticsearch' },
  { value: 'InfluxDB', label: 'InfluxDB' },
  { value: 'Supabase', label: 'Supabase' },
  
  // ML/AI
  { value: 'TensorFlow', label: 'TensorFlow' },
  { value: 'PyTorch', label: 'PyTorch' },
  { value: 'Keras', label: 'Keras' },
  { value: 'scikit-learn', label: 'scikit-learn' },
  { value: 'XGBoost', label: 'XGBoost' },
  { value: 'NLTK', label: 'NLTK' },
  { value: 'spaCy', label: 'spaCy' },
  { value: 'Rasa', label: 'Rasa' },
  
  // Cloud & DevOps
  { value: 'Docker', label: 'Docker' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'Firebase', label: 'Firebase' },
  { value: 'Vercel', label: 'Vercel' },
  { value: 'Cloudflare', label: 'Cloudflare' },
  
  // Other
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'tRPC', label: 'tRPC' },
  { value: 'Socket.io', label: 'Socket.io' },
  { value: 'Prisma', label: 'Prisma' },
  { value: 'Tailwind', label: 'Tailwind' },
  { value: 'Blockchain', label: 'Blockchain' },
  { value: 'Solidity', label: 'Solidity' },
  { value: 'Web3.js', label: 'Web3.js' },
].sort((a, b) => a.label.localeCompare(b.label));

const YEAR_OPTIONS = [
  { value: 'Second Year', label: 'Second Year' },
  { value: 'Third Year', label: 'Third Year' },
  { value: 'Final Year', label: 'Final Year' },
];

const DURATION_OPTIONS = [
  { value: '2-3 weeks', label: '2-3 weeks' },
  { value: '3-4 weeks', label: '3-4 weeks' },
  { value: '4-5 weeks', label: '4-5 weeks' },
  { value: '4-6 weeks', label: '4-6 weeks' },
  { value: '5-6 weeks', label: '5-6 weeks' },
  { value: '5-7 weeks', label: '5-7 weeks' },
  { value: '6-8 weeks', label: '6-8 weeks' },
  { value: '8-10 weeks', label: '8-10 weeks' },
  { value: '10-12 weeks', label: '10-12 weeks' },
];

export default function ProjectsClient({
  initialProjects,
  initialTotal,
  initialPage,
  initialTotalPages,
}: ProjectsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const isInitialMount = useRef(true);
  const hasRestoredFromCache = useRef(false);
  const isReturningFromDetail = useRef(
    typeof window !== 'undefined' && sessionStorage.getItem('projectListUrl') !== null
  );
  
  const [projects, setProjects] = useState(initialProjects);
  const [total, setTotal] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  
  const [filters, setFilters] = useState({
    domains: searchParams.get('domains')?.split(',').filter(Boolean) || [],
    difficulties: searchParams.get('difficulties')?.split(',').filter(Boolean) || [],
    techStack: searchParams.get('techStack')?.split(',').filter(Boolean) || [],
    years: searchParams.get('years')?.split(',').filter(Boolean) || [],
    durations: searchParams.get('durations')?.split(',').filter(Boolean) || [],
  });

  // Restore scroll position and cached data when coming back from detail page
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem('projectListScrollY');
    const savedUrl = sessionStorage.getItem('projectListUrl');
    
    if (savedScrollY && savedUrl && !hasRestoredFromCache.current) {
      hasRestoredFromCache.current = true;
      
      // Parse the saved URL to get the page number and filters
      const url = new URL(savedUrl);
      const savedPage = parseInt(url.searchParams.get('page') || '1');
      const cacheKey = url.search.substring(1); // Remove the '?' prefix
      
      // Try to get cached data
      const cached = projectsCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        // Restore from cache
        setProjects(cached.projects);
        setTotal(cached.total);
        setTotalPages(cached.totalPages);
        setCurrentPage(savedPage);
        
        // Restore scroll position
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScrollY),
            behavior: 'instant' as ScrollBehavior,
          });
        }, 50);
      }
      
      // Clean up after restoration and reset the flag
      setTimeout(() => {
        sessionStorage.removeItem('projectListScrollY');
        sessionStorage.removeItem('projectListUrl');
        // Reset the flag so pagination clicks work normally
        hasRestoredFromCache.current = false;
        isReturningFromDetail.current = false;
      }, 500);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch projects when filters change
  useEffect(() => {
    // Skip fetch on initial mount - use initialProjects from server
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Skip fetch ONLY if we just restored from cache AND haven't reset the flag yet
    // This allows pagination clicks to work after restoration is complete
    if (hasRestoredFromCache.current && isReturningFromDetail.current) {
      return;
    }

    const fetchProjects = async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (filters.domains.length) params.set('domains', filters.domains.join(','));
      if (filters.difficulties.length) params.set('difficulties', filters.difficulties.join(','));
      if (filters.techStack.length) params.set('techStack', filters.techStack.join(','));
      if (filters.years.length) params.set('years', filters.years.join(','));
      if (filters.durations.length) params.set('durations', filters.durations.join(','));
      params.set('page', currentPage.toString());

      const cacheKey = params.toString();
      
      // Check cache first
      const cached = projectsCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setProjects(cached.projects);
        setTotal(cached.total);
        setTotalPages(cached.totalPages);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/projects?${params.toString()}`);
        const data = await response.json();
        
        // Update cache
        projectsCache.set(cacheKey, {
          projects: data.projects,
          total: data.total,
          totalPages: data.totalPages,
          timestamp: Date.now(),
        });

        setProjects(data.projects);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    
    // Update URL without navigation (preserves scroll position)
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (filters.domains.length) params.set('domains', filters.domains.join(','));
    if (filters.difficulties.length) params.set('difficulties', filters.difficulties.join(','));
    if (filters.techStack.length) params.set('techStack', filters.techStack.join(','));
    if (filters.years.length) params.set('years', filters.years.join(','));
    if (filters.durations.length) params.set('durations', filters.durations.join(','));
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    startTransition(() => {
      router.replace(`/projects${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
    });
  }, [debouncedSearch, filters, currentPage, router]);

  const handleFilterToggle = useCallback((filterType: 'domains' | 'difficulties' | 'techStack' | 'years' | 'durations', value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
    setCurrentPage(1);
  }, []);

  const handleRemoveFilter = useCallback((filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev].filter(v => v !== value),
    }));
    setCurrentPage(1);
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters({ domains: [], difficulties: [], techStack: [], years: [], durations: [] });
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const hasActiveFilters = filters.domains.length > 0 || filters.difficulties.length > 0 || filters.techStack.length > 0 || filters.years.length > 0 || filters.durations.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-border-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-90 mb-4">
            Explore{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"></div>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-60 max-w-3xl">
            Curated final year and innovative project ideas tailored for students
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search and Filters Row */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            {/* Search Bar */}
            <div className="relative lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full px-6 py-2.5 pl-12 bg-glass-5 border border-border-10 rounded-lg text-text-90 placeholder-text-60 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-glass-10 flex items-center justify-center text-text-60 hover:text-text-90 hover:bg-glass-20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              <FilterDropdown
                title="Domain"
                options={DOMAIN_OPTIONS}
                selectedValues={filters.domains}
                onToggle={(value) => handleFilterToggle('domains', value)}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
              />

              <FilterDropdown
                title="Difficulty"
                options={DIFFICULTY_OPTIONS}
                selectedValues={filters.difficulties}
                onToggle={(value) => handleFilterToggle('difficulties', value)}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />

              <FilterDropdown
                title="Tech Stack"
                options={TECH_STACK_OPTIONS}
                selectedValues={filters.techStack}
                onToggle={(value) => handleFilterToggle('techStack', value)}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                }
              />

              <FilterDropdown
                title="Academic Year"
                options={YEAR_OPTIONS}
                selectedValues={filters.years}
                onToggle={(value) => handleFilterToggle('years', value)}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                }
              />

              <FilterDropdown
                title="Duration"
                options={DURATION_OPTIONS}
                selectedValues={filters.durations}
                onToggle={(value) => handleFilterToggle('durations', value)}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>
          )}

          {/* Results Count */}
          <div>
            <p className="text-sm text-text-60">
              {isLoading ? 'Loading...' : `${total} ${total === 1 ? 'project' : 'projects'} found`}
            </p>
          </div>
        </div>

        {/* Project Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center bg-glass-5 border border-border-10 rounded-xl p-12 max-w-md">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-text-90 mb-2">No projects found</h3>
              <p className="text-text-60 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:scale-105 transition-all shadow-lg shadow-purple-600/20"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
