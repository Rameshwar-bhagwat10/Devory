'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  badge?: number;
  compact?: boolean;
}

export default function NavItem({ 
  href, 
  icon: Icon, 
  label, 
  isActive = false, 
  badge,
  compact = false 
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 px-4 rounded-xl transition-all duration-200
        ${compact ? 'py-2' : 'py-3'}
        ${isActive 
          ? 'bg-purple-500/8 text-white' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        }
        hover:scale-102
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r-full"></div>
      )}

      {/* Icon */}
      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-400' : ''}`} />

      {/* Label */}
      <span className={`flex-1 font-medium ${compact ? 'text-sm' : ''}`}>
        {label}
      </span>

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full">
          {badge > 99 ? '99+' : badge}
        </span>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-200 pointer-events-none"></div>
    </Link>
  );
}
