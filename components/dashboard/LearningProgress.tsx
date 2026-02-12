'use client';

import { useState, useEffect } from 'react';

export default function LearningProgress() {
  const [isMobile, setIsMobile] = useState(false);
  const progress = 0.65; // 65%
  
  // Mobile dimensions
  const mobileRadius = 56;
  const mobileCx = 64;
  const mobileCy = 64;
  const mobileStrokeWidth = 10;
  
  // Desktop dimensions
  const desktopRadius = 70;
  const desktopCx = 80;
  const desktopCy = 80;
  const desktopStrokeWidth = 12;
  
  // Use appropriate dimensions based on screen size
  const radius = isMobile ? mobileRadius : desktopRadius;
  const cx = isMobile ? mobileCx : desktopCx;
  const cy = isMobile ? mobileCy : desktopCy;
  const strokeWidth = isMobile ? mobileStrokeWidth : desktopStrokeWidth;
  
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  
  useEffect(() => {
    // Check if window is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-glass-5 border border-border-10 rounded-xl sm:rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-text-90 mb-1">Learning Progress</h3>
          <p className="text-xs sm:text-sm text-text-60">Your journey this month</p>
        </div>
        <div className="px-3 py-1.5 bg-accent-orange/10 border border-accent-orange/30 rounded-full">
          <span className="text-xs font-bold text-accent-orange">🔥 5 Day Streak</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <svg className="transform -rotate-90 w-32 h-32 sm:w-40 sm:h-40">
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-glass-10"
            />
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" />
                <stop offset="50%" stopColor="#ff006e" />
                <stop offset="100%" stopColor="#ff0040" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {Math.round(progress * 100)}%
            </div>
            <div className="text-xs text-text-60">Complete</div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-text-60">Projects Started</span>
            <span className="text-xs sm:text-sm font-bold text-text-90">3/5</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-glass-10 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-text-60">Skills Learned</span>
            <span className="text-xs sm:text-sm font-bold text-text-90">8/10</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-glass-10 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-text-60">Community Engagement</span>
            <span className="text-xs sm:text-sm font-bold text-text-90">12/20</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-glass-10 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
