'use client';

import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Explore Projects',
      description: 'Discover 260+ curated ideas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: '/projects',
      iconColor: 'text-accent-orange',
      iconBg: 'bg-accent-orange/10',
    },
    {
      title: 'Community Ideas',
      description: 'Share & discover projects',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/community',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
    },
    {
      title: 'Saved Projects',
      description: 'Your bookmarked ideas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      href: '/saved',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold text-text-90">
            Quick Actions
          </h2>
        </div>
        <p className="text-text-60">Fast access to your favorite features</p>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={action.title}
            href={action.href}
            className={`group relative bg-[#0f0f0f] border border-white/5 rounded-xl p-5 transition-all duration-300 hover:bg-[#141414] hover:border-white/10 opacity-0 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center ${action.iconColor} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                {action.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-text-90 mb-1 group-hover:text-accent-orange transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-text-60 leading-relaxed">
                  {action.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-text-60 group-hover:text-accent-orange group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
