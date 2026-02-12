'use client';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'blue' | 'purple' | 'orange' | 'green';
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/30 hover:border-blue-500',
    bg: 'bg-blue-500/20',
    borderIcon: 'border-blue-500/30',
    text: 'text-blue-400',
    blur: 'bg-blue-500/20',
  },
  purple: {
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/30 hover:border-purple-500',
    bg: 'bg-purple-500/20',
    borderIcon: 'border-purple-500/30',
    text: 'text-purple-400',
    blur: 'bg-purple-500/20',
  },
  orange: {
    gradient: 'from-orange-500/10 to-red-500/10',
    border: 'border-orange-500/30 hover:border-orange-500',
    bg: 'bg-orange-500/20',
    borderIcon: 'border-orange-500/30',
    text: 'text-orange-400',
    blur: 'bg-orange-500/20',
  },
  green: {
    gradient: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/30 hover:border-green-500',
    bg: 'bg-green-500/20',
    borderIcon: 'border-green-500/30',
    text: 'text-green-400',
    blur: 'bg-green-500/20',
  },
};

const STATS: StatItem[] = [
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    value: '12',
    label: 'Projects Explored',
    color: 'blue',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    value: '5',
    label: 'Projects Saved',
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '48h',
    label: 'Learning Hours',
    color: 'orange',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '40%',
    label: 'Completion Rate',
    color: 'green',
  },
];

export default function StatsWidget() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat) => {
        const colors = colorClasses[stat.color];
        return (
          <div
            key={stat.label}
            className={`group relative bg-glass-5 border border-border-10 rounded-2xl p-3 sm:p-6 hover:border-${stat.color}-500 transition-all duration-500 overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className={`absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 ${colors.blur} rounded-full blur-2xl group-hover:opacity-100 opacity-50 transition-all duration-500`}></div>
            
            <div className="relative">
              {/* Mobile: Horizontal Layout */}
              <div className="flex sm:hidden items-center gap-3">
                {/* Compact Circle for Mobile */}
                <div className="relative flex-shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="url(#gradient-${stat.color})"
                      strokeWidth="2"
                      strokeDasharray="226.195"
                      strokeDashoffset="56"
                      className="opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        animation: 'dash 8s linear infinite',
                      }}
                    />
                    <defs>
                      <linearGradient id={`gradient-${stat.color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={stat.color === 'blue' ? '#3b82f6' : stat.color === 'purple' ? '#a855f7' : stat.color === 'orange' ? '#f97316' : '#10b981'} />
                        <stop offset="100%" stopColor={stat.color === 'blue' ? '#06b6d4' : stat.color === 'purple' ? '#ec4899' : stat.color === 'orange' ? '#ef4444' : '#059669'} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className={`relative w-20 h-20 rounded-full border-3 ${colors.borderIcon} bg-gradient-to-br ${colors.gradient} flex flex-col items-center justify-center group-hover:scale-110 transition-all duration-500 backdrop-blur-sm`}>
                    <div className={`absolute inset-2 rounded-full ${colors.bg} opacity-40 blur-md`}></div>
                    <div className="relative z-10 text-center">
                      <div className={`${colors.text} mb-0.5 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <div className={`text-lg font-bold ${colors.text} leading-none`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className={`absolute top-2 right-2 w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-60 animate-pulse`}></div>
                    <div className={`absolute bottom-2 left-2 w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-60 animate-pulse`} style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                {/* Text Content for Mobile */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-90 font-bold mb-1 truncate">{stat.label}</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.borderIcon}`}>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +12%
                  </div>
                </div>
              </div>

              {/* Desktop: Vertical Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="url(#gradient-${stat.color}-desktop)"
                        strokeWidth="2"
                        strokeDasharray="339.292"
                        strokeDashoffset="85"
                        className="opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                        style={{
                          animation: 'dash 8s linear infinite',
                        }}
                      />
                      <defs>
                        <linearGradient id={`gradient-${stat.color}-desktop`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={stat.color === 'blue' ? '#3b82f6' : stat.color === 'purple' ? '#a855f7' : stat.color === 'orange' ? '#f97316' : '#10b981'} />
                          <stop offset="100%" stopColor={stat.color === 'blue' ? '#06b6d4' : stat.color === 'purple' ? '#ec4899' : stat.color === 'orange' ? '#ef4444' : '#059669'} />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className={`relative w-32 h-32 rounded-full border-4 ${colors.borderIcon} bg-gradient-to-br ${colors.gradient} flex flex-col items-center justify-center group-hover:scale-110 transition-all duration-500 backdrop-blur-sm`}>
                      <div className={`absolute inset-3 rounded-full ${colors.bg} opacity-40 blur-md`}></div>
                      <div className="relative z-10 text-center">
                        <div className={`${colors.text} mb-1.5 group-hover:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
                        <div className={`text-3xl font-bold ${colors.text} leading-none`}>
                          {stat.value}
                        </div>
                      </div>
                      <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-60 animate-pulse`}></div>
                      <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-60 animate-pulse`} style={{ animationDelay: '1s' }}></div>
                      <div className={`absolute top-1/2 left-2 w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-40`}></div>
                      <div className={`absolute top-1/2 right-2 w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-40`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-base text-text-90 font-bold">{stat.label}</div>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.borderIcon}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +12%
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient.replace('/10', '/100')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </div>
        );
      })}
    </div>
  );
}
