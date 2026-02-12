'use client';

import Link from 'next/link';

interface ProfileData {
  degree: string;
  branch: string;
  year: string;
  interest: string;
  skillLevel: string;
}

const SKILL_LEVEL_COLORS: Record<string, string> = {
  'Beginner': 'bg-green-500/10 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function ProfileSnapshot({ profileData }: { profileData: ProfileData }) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-text-90">Your Profile</h2>
            <p className="text-xs sm:text-sm text-text-60">Academic & Learning Preferences</p>
          </div>
        </div>
        <Link
          href="/profile"
          className="w-full sm:w-auto px-4 py-2 bg-glass-5 border border-border-10 rounded-lg text-sm text-text-90 hover:border-accent-orange hover:text-accent-orange transition-all flex items-center justify-center gap-2 group"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </Link>
      </div>

      {/* Bento Grid Layout - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Interest Card - Large Featured */}
        <div className="col-span-2 sm:col-span-2 md:col-span-3 row-span-2 group relative overflow-hidden bg-gradient-to-br from-accent-orange/10 via-accent-pink/10 to-accent-red/10 border-2 border-accent-orange/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-accent-orange transition-all">
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-accent-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-accent-pink/20 rounded-full blur-3xl"></div>
          
          <div className="relative h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">Primary Interest</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-orange mb-2 break-words">
                {profileData.interest}
              </h3>
              <p className="text-xs sm:text-sm text-text-60">Your main area of focus</p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-glass-10 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-primary rounded-full"></div>
              </div>
              <span className="text-xs font-medium text-accent-orange">80%</span>
            </div>
          </div>
        </div>

        {/* Degree Card */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 group relative overflow-hidden bg-glass-5 border border-border-10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-accent-orange/30 transition-all">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="text-xs text-text-60 mb-1 font-medium">Degree</div>
            <div className="text-xs sm:text-sm font-bold text-text-90 break-words">{profileData.degree}</div>
          </div>
        </div>

        {/* Branch Card */}
        <div className="col-span-1 sm:col-span-2 md:col-span-2 group relative overflow-hidden bg-glass-5 border border-border-10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-accent-orange/30 transition-all">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="text-xs text-text-60 mb-1 font-medium">Specialization</div>
            <div className="text-xs sm:text-sm font-bold text-text-90 break-words">{profileData.branch}</div>
          </div>
        </div>

        {/* Year Card */}
        <div className="col-span-1 sm:col-span-1 md:col-span-1 group relative overflow-hidden bg-glass-5 border border-border-10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-accent-orange/30 transition-all">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-xs text-text-60 mb-1 font-medium">Year</div>
            <div className="text-xs sm:text-sm font-bold text-text-90 break-words">{profileData.year}</div>
          </div>
        </div>

        {/* Skill Level Card */}
        <div className="col-span-1 sm:col-span-1 md:col-span-2 group relative overflow-hidden bg-glass-5 border border-border-10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-accent-orange/30 transition-all">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-xs text-text-60 mb-1 font-medium">Skill Level</div>
            <div className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-1 rounded-lg border ${SKILL_LEVEL_COLORS[profileData.skillLevel] || 'text-text-90'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {profileData.skillLevel}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
