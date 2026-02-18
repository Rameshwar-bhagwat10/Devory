'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBookmark, FaDownload, FaEye, FaUsers, FaPen, FaTrophy, FaLightbulb } from 'react-icons/fa';

interface EnhancedStatsCardsProps {
  savedCount: number;
  downloadsCount: number;
  exploredCount: number;
  activeCollaborationsCount: number;
  communityPostsCount: number;
  reputationScore: number;
  skillsLearnedCount: number;
}

export default function EnhancedStatsCards({
  savedCount,
  downloadsCount,
  exploredCount,
  activeCollaborationsCount,
  communityPostsCount,
  reputationScore,
  skillsLearnedCount,
}: EnhancedStatsCardsProps) {
  const [animated, setAnimated] = useState({
    saved: 0,
    downloads: 0,
    explored: 0,
    collaborations: 0,
    posts: 0,
    reputation: 0,
    skills: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = {
      saved: savedCount / steps,
      downloads: downloadsCount / steps,
      explored: exploredCount / steps,
      collaborations: activeCollaborationsCount / steps,
      posts: communityPostsCount / steps,
      reputation: reputationScore / steps,
      skills: skillsLearnedCount / steps,
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimated({
        saved: Math.min(Math.round(increment.saved * currentStep), savedCount),
        downloads: Math.min(Math.round(increment.downloads * currentStep), downloadsCount),
        explored: Math.min(Math.round(increment.explored * currentStep), exploredCount),
        collaborations: Math.min(Math.round(increment.collaborations * currentStep), activeCollaborationsCount),
        posts: Math.min(Math.round(increment.posts * currentStep), communityPostsCount),
        reputation: Math.min(Math.round(increment.reputation * currentStep), reputationScore),
        skills: Math.min(Math.round(increment.skills * currentStep), skillsLearnedCount),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [savedCount, downloadsCount, exploredCount, activeCollaborationsCount, communityPostsCount, reputationScore, skillsLearnedCount]);

  const stats = [
    {
      icon: FaBookmark,
      label: 'Saved',
      value: animated.saved,
      href: '/saved',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaDownload,
      label: 'Downloads',
      value: animated.downloads,
      href: null,
      color: '#ff6b00',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FaEye,
      label: 'Explored',
      value: animated.explored,
      href: '/projects',
      color: '#a855f7',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaUsers,
      label: 'Collaborations',
      value: animated.collaborations,
      href: '/community/collaborations',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: FaPen,
      label: 'Posts',
      value: animated.posts,
      href: '/community',
      color: '#10b981',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaTrophy,
      label: 'Reputation',
      value: animated.reputation,
      href: '/profile',
      color: '#f59e0b',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaLightbulb,
      label: 'Skills',
      value: animated.skills,
      href: null,
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {stats.map((stat, index) => {
        const Card = stat.href ? Link : 'div';
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            href={stat.href || ''}
            className={`group relative bg-[#0d0d0d] border border-white/10 rounded-xl p-4 opacity-0 animate-fade-in hover:border-white/20 transition-all ${
              stat.href ? 'cursor-pointer' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
            
            <div className="relative flex flex-col items-center text-center space-y-2">
              {/* Icon */}
              <div 
                className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform"
                style={{ color: stat.color }}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Value */}
              <div className="text-2xl font-bold text-text-90 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs font-medium text-text-60 group-hover:text-text-90 transition-colors">
                {stat.label}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
