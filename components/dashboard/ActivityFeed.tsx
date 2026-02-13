'use client';

interface Activity {
  icon: React.ReactNode;
  text: string;
  highlight: string;
  highlightColor: string;
  time: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
}

const ACTIVITIES: Activity[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    text: 'Saved',
    highlight: 'E-Commerce Platform',
    highlightColor: 'text-purple-400',
    time: '2 hours ago',
    iconBg: 'bg-purple-500/20',
    iconBorder: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Completed',
    highlight: 'Onboarding',
    highlightColor: 'text-green-400',
    time: 'Yesterday',
    iconBg: 'bg-green-500/20',
    iconBorder: 'border-green-500/30',
    iconColor: 'text-green-400',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: '',
    highlight: '3 new projects',
    highlightColor: 'text-blue-400',
    time: '2 days ago',
    iconBg: 'bg-blue-500/20',
    iconBorder: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    text: 'Joined',
    highlight: 'Devory Community',
    highlightColor: 'text-orange-400',
    time: '3 days ago',
    iconBg: 'bg-orange-500/20',
    iconBorder: 'border-orange-500/30',
    iconColor: 'text-orange-400',
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-glass-5 border border-border-10 rounded-xl sm:rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-text-90 mb-1">Recent Activity</h3>
          <p className="text-xs sm:text-sm text-text-60">Your latest actions</p>
        </div>
        <button className="text-xs sm:text-sm text-accent-orange hover:text-accent-pink transition-colors">
          View All
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4 sm:space-y-6">
        {ACTIVITIES.map((activity, index) => (
          <div key={index} className="flex gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${activity.iconBg} border ${activity.iconBorder} flex items-center justify-center ${activity.iconColor}`}>
                {activity.icon}
              </div>
              {index < ACTIVITIES.length - 1 && (
                <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-border-10 to-transparent"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-text-90 mb-1 break-words">
                {activity.text && `${activity.text} `}
                <span className={`font-semibold ${activity.highlightColor}`}>
                  {activity.highlight}
                </span>
                {activity.text === '' && ' match your interests'}
              </p>
              <p className="text-xs text-text-60">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

