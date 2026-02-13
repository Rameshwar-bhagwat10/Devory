'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StatsCardsProps {
  savedCount: number;
  downloadsCount: number;
  exploredCount: number;
}

export default function StatsCards({ savedCount, downloadsCount, exploredCount }: StatsCardsProps) {
  const [animatedSaved, setAnimatedSaved] = useState(0);
  const [animatedDownloads, setAnimatedDownloads] = useState(0);
  const [animatedExplored, setAnimatedExplored] = useState(0);

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const savedStep = savedCount / steps;
    const downloadsStep = downloadsCount / steps;
    const exploredStep = exploredCount / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedSaved(Math.min(Math.round(savedStep * currentStep), savedCount));
      setAnimatedDownloads(Math.min(Math.round(downloadsStep * currentStep), downloadsCount));
      setAnimatedExplored(Math.min(Math.round(exploredStep * currentStep), exploredCount));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [savedCount, downloadsCount, exploredCount]);

  const stats = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      label: 'Saved',
      value: animatedSaved,
      href: '/saved',
      color: '#3b82f6',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Downloads',
      value: animatedDownloads,
      href: null,
      color: '#ff6b00',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      label: 'Explored',
      value: animatedExplored,
      href: '/projects',
      color: '#a855f7',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => {
        const Card = stat.href ? Link : 'div';
        const circumference = 2 * Math.PI * 45;
        const progress = 75; // Fixed progress for visual appeal
        const offset = circumference - (progress / 100) * circumference;

        return (
          <Card
            key={stat.label}
            href={stat.href || ''}
            className={`group relative flex flex-col items-center opacity-0 animate-fade-in ${
              stat.href ? 'cursor-pointer' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {/* Ring with stats */}
            <div className="relative">
              {/* SVG Ring */}
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-border-10"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke={stat.color}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 opacity-50 group-hover:opacity-100"
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-1" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-text-90 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="mt-4 text-center">
              <div className="text-sm font-medium text-text-60 group-hover:text-text-90 transition-colors">
                {stat.label}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
