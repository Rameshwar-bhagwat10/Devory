'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import StatsWidget from './StatsWidget';
import LearningProgress from './LearningProgress';
import ActivityFeed from './ActivityFeed';
import ProfileSnapshot from './ProfileSnapshot';

interface ProfileData {
  degree: string;
  branch: string;
  year: string;
  interest: string;
  skillLevel: string;
}

interface DashboardClientProps {
  userName: string;
  userInterest: string;
  profileData: ProfileData;
}

// Placeholder project data
const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Build a full-stack online store with payment integration and inventory management',
    difficulty: 'INTERMEDIATE',
    domain: 'WEB DEVELOPMENT',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'AI Chatbot Assistant',
    description: 'Create an intelligent conversational AI using modern ML frameworks and NLP',
    difficulty: 'ADVANCED',
    domain: 'AI & ML',
    tags: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Design a productivity tool with real-time collaboration and notifications',
    difficulty: 'BEGINNER',
    domain: 'WEB DEVELOPMENT',
    tags: ['Next.js', 'Firebase', 'Tailwind'],
  },
];

const QUICK_ACTIONS = [
  {
    title: 'Saved Projects',
    description: 'View your bookmarks',
    count: '0',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    href: '/saved',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Community Ideas',
    description: 'Explore shared projects',
    count: '24',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '/community',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'AI Roadmap',
    description: 'Generate learning path',
    count: 'New',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: '/projects',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
];

const DIFFICULTY_COLORS = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
};

export default function DashboardClient({ userName, userInterest, profileData }: DashboardClientProps) {
  const [showHero, setShowHero] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const heroTimer = setTimeout(() => setShowHero(true), 100);
    const profileTimer = setTimeout(() => setShowProfile(true), 300);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 500);
    const cardsTimer = setTimeout(() => setShowCards(true), 700);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(profileTimer);
      clearTimeout(buttonsTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-orange/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">
          <div className={`text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 transition-all duration-700 ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block">
              <div className="text-xs sm:text-sm font-medium text-text-60 mb-2 tracking-wider uppercase">Welcome Back</div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-90 mb-3 sm:mb-4 px-2">
                Hey,{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    {userName}
                  </span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path
                      d="M1 5.5C50 2.5 150 2.5 199 5.5"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ${showHero ? 'opacity-100' : 'opacity-0'}`}
                      style={{ strokeDasharray: 200, strokeDashoffset: showHero ? 0 : 200 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b00" />
                        <stop offset="50%" stopColor="#ff006e" />
                        <stop offset="100%" stopColor="#ff0040" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="inline-block ml-2 sm:ml-4">👋</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-text-60 max-w-3xl mx-auto leading-relaxed px-4">
              Ready to dive into <span className="text-accent-orange font-semibold">{userInterest}</span>? 
              <br className="hidden sm:block" />
              We&apos;ve curated the perfect projects to match your journey.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ProfileSnapshot profileData={profileData} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-16">
        
        {/* Stats Widget */}
        <section className={`transition-all duration-700 ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <StatsWidget />
        </section>

        {/* Learning Progress & Activity Feed */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className={`transition-all duration-700 ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <LearningProgress />
          </div>
          <div className={`transition-all duration-700 delay-100 ${showProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ActivityFeed />
          </div>
        </section>

        {/* Primary Action Panel */}
        <section className={`transition-all duration-700 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/projects"
                className="group relative px-6 sm:px-10 py-4 sm:py-5 bg-gradient-primary text-white font-bold rounded-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Explore Personalized Projects
                </span>
              </Link>
              <Link
                href="/projects"
                className="px-6 sm:px-10 py-4 sm:py-5 bg-glass-5 border-2 border-border-10 text-text-90 font-bold rounded-xl transition-all hover:border-accent-orange/50 hover:bg-glass-10 focus:outline-none focus:ring-2 focus:ring-accent-orange/30 text-sm sm:text-base"
              >
                Browse All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended Projects */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 rounded-full mb-3">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">Curated For You</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-90 mb-2 sm:mb-3">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Recommended Projects
                </span>
              </h2>
              <p className="text-text-60 text-sm sm:text-base md:text-lg">Handpicked based on your profile and interests</p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-glass-5 border border-border-10 rounded-xl text-text-90 hover:border-accent-orange hover:text-accent-orange transition-all group"
            >
              <span className="font-medium">View All Projects</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PLACEHOLDER_PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className={`group relative transition-all duration-700 ${
                  showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full bg-glass-5 border border-border-10 rounded-2xl overflow-hidden hover:border-accent-orange/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/0 via-accent-pink/0 to-accent-red/0 group-hover:from-accent-orange/5 group-hover:via-accent-pink/5 group-hover:to-accent-red/5 transition-all duration-700"></div>
                  <div className="h-0.5 bg-gradient-primary"></div>
                  
                  <div className="relative p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4 sm:mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border font-bold uppercase tracking-wide ${DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-glass-10 border border-border-10 flex items-center justify-center text-text-60 hover:text-accent-orange hover:border-accent-orange hover:bg-accent-orange/10 transition-all group/btn">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 border border-accent-orange/30 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-text-90 mb-2 sm:mb-3 group-hover:text-accent-orange transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-60 mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-glass-10 text-text-60 border border-border-10 hover:border-accent-orange/30 hover:text-text-90 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent mb-4 sm:mb-5"></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-accent-orange uppercase tracking-wide">
                          {project.domain}
                        </span>
                      </div>
                      
                      <button className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-text-60 hover:text-accent-orange transition-colors group/link">
                        <span>Explore</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>

                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                </div>

                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-orange/0 to-accent-pink/0 group-hover:from-accent-orange/10 group-hover:to-accent-pink/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"></div>
              </div>
            ))}
          </div>

          <div className="md:hidden mt-6 sm:mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary text-white font-bold rounded-xl hover:scale-105 transition-all text-sm sm:text-base"
            >
              <span>View All Projects</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-90 mb-2">Quick Actions</h2>
            <p className="text-sm sm:text-base text-text-60">Fast access to your favorite features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {QUICK_ACTIONS.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative bg-glass-5 border border-border-10 rounded-2xl p-6 sm:p-8 hover:border-accent-orange transition-all duration-500 overflow-hidden ${
                  showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 3) * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 bg-accent-orange/10 rounded-full blur-2xl group-hover:bg-accent-orange/20 transition-all duration-500"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 sm:w-24 sm:h-24 bg-accent-pink/10 rounded-full blur-2xl group-hover:bg-accent-pink/20 transition-all duration-500"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 rounded-2xl flex items-center justify-center text-accent-orange border border-accent-orange/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {action.icon}
                    </div>
                    <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-accent-orange/10 border border-accent-orange/30 rounded-full">
                      <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">
                        {action.count}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-text-90 mb-2 group-hover:text-accent-orange transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-60 mb-5 sm:mb-6 leading-relaxed">{action.description}</p>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent mb-5 sm:mb-6"></div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-accent-orange uppercase tracking-wide">
                      Explore
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange transition-all">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
