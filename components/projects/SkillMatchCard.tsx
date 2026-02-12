'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SkillMatchCardProps {
  projectId: string;
}

interface MatchData {
  matchPercentage: number;
  difficultyCompatible: boolean;
  label: string;
}

export default function SkillMatchCard({ projectId }: SkillMatchCardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/projects/match?projectId=${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setMatchData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch match data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [projectId, session, status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="bg-glass-5 border border-border-10 rounded-2xl p-6 animate-pulse backdrop-blur-sm">
        <div className="h-40 bg-glass-10 rounded-xl"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative bg-glass-5 border border-border-10 rounded-2xl p-6 overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 backdrop-blur-md bg-dark-base/90 flex items-center justify-center z-10 rounded-2xl">
          <div className="text-center space-y-4 px-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-orange to-accent-pink rounded-2xl flex items-center justify-center shadow-lg shadow-accent-orange/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-text-90 font-semibold mb-1">Login Required</p>
              <p className="text-text-60 text-sm">See your personalized skill match</p>
            </div>
            <button
              onClick={() => router.push(`/auth?callbackUrl=${encodeURIComponent(window.location.pathname)}`)}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-accent-orange via-accent-pink to-accent-red text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent-orange/30 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-red via-accent-pink to-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">Login to View</span>
            </button>
          </div>
        </div>
        <div className="blur-sm opacity-30">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-border-10"
                />
              </svg>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-90 mb-1">--</div>
            <div className="text-sm text-text-60">Skill Match</div>
          </div>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return null;
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-accent-orange';
    return 'text-red-400';
  };

  const getStrokeColor = (percentage: number) => {
    if (percentage >= 80) return '#4ade80';
    if (percentage >= 60) return '#fb923c';
    return '#f87171';
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (matchData.matchPercentage / 100) * circumference;

  return (
    <div className="bg-glass-5 border border-border-10 rounded-2xl p-6 space-y-5 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-60 uppercase tracking-wider">Skill Match</h3>
        <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-28 h-28">
          <svg className="transform -rotate-90 w-28 h-28">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-border-10"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke={getStrokeColor(matchData.matchPercentage)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-lg"
              style={{ 
                animation: 'dash 1s ease-out forwards',
                filter: `drop-shadow(0 0 8px ${getStrokeColor(matchData.matchPercentage)}40)`
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className={`text-3xl font-bold ${getMatchColor(matchData.matchPercentage)}`}>
                {matchData.matchPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${
          matchData.matchPercentage >= 80 
            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
            : matchData.matchPercentage >= 60
            ? 'bg-accent-orange/10 text-accent-orange border border-accent-orange/30'
            : 'bg-red-500/10 text-red-400 border border-red-500/30'
        }`}>
          {matchData.matchPercentage >= 80 && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {matchData.label}
        </div>
        {!matchData.difficultyCompatible && (
          <p className="text-xs text-text-60 leading-relaxed">
            This project may be challenging for your current level
          </p>
        )}
      </div>
    </div>
  );
}
