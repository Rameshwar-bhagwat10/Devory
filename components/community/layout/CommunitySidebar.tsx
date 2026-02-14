'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Home, 
  TrendingUp, 
  Users, 
  Star, 
  UserPlus, 
  PenSquare, 
  Bell,
  Globe,
  Zap,
  Shield,
  Flame,
  Sparkles
} from 'lucide-react';
import NavItem from './NavItem';
import SidebarUserCard from './SidebarUserCard';

interface CommunitySidebarProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const primaryLinks = [
  { href: '/community', icon: Home, label: 'Feed', exact: true },
  { href: '/community/trending', icon: TrendingUp, label: 'Trending' },
  { href: '/community/collaborations', icon: Users, label: 'Collaborations' },
  { href: '/community/saved', icon: Star, label: 'Saved' },
  { href: '/community/following', icon: UserPlus, label: 'Following' },
];

const filterLinks = [
  { href: '/community?domain=WEB_DEVELOPMENT', icon: Globe, label: 'Web Dev' },
  { href: '/community?domain=MOBILE_DEVELOPMENT', icon: Sparkles, label: 'Mobile' },
  { href: '/community?domain=AI_ML', icon: Zap, label: 'AI/ML' },
  { href: '/community?difficulty=BEGINNER', icon: Shield, label: 'Beginner' },
  { href: '/community?difficulty=ADVANCED', icon: Flame, label: 'Advanced' },
];

export default function CommunitySidebar({ user }: CommunitySidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [notificationCount] = useState(0);

  const isActive = (href: string, exact?: boolean) => {
    const url = new URL(href, 'http://localhost');
    const hrefPath = url.pathname;
    
    if (exact) {
      return pathname === hrefPath && !searchParams.toString();
    }
    
    return pathname === hrefPath;
  };

  return (
    <aside className="fixed left-0 top-16 w-[280px] h-[calc(100vh-4rem)] bg-[#0a0f1a]/80 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Navigation Links - Scrollable if needed but hide scrollbar */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {/* Primary Links */}
        <div className="space-y-1 mb-6">
          {primaryLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={isActive(link.href, link.exact)}
            />
          ))}
        </div>

        {/* Create Post Button */}
        {user && (
          <Link
            href="/community/new"
            className="flex items-center gap-3 px-4 py-3 mb-6 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg shadow-purple-600/20"
          >
            <PenSquare className="w-5 h-5" />
            <span>Create Post</span>
          </Link>
        )}

        {/* Notifications */}
        {user && (
          <div className="mb-6">
            <NavItem
              href="/community/notifications"
              icon={Bell}
              label="Notifications"
              isActive={pathname === '/community/notifications'}
              badge={notificationCount > 0 ? notificationCount : undefined}
            />
          </div>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Filter Quick Links */}
        <div className="space-y-1">
          <p className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
            Browse by Category
          </p>
          {filterLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={isActive(link.href)}
              compact
            />
          ))}
        </div>
      </nav>

      {/* Bottom Section - User Card (Fixed at bottom) */}
      {user && (
        <div className="border-t border-white/10 bg-[#0a0f1a]/95 backdrop-blur-sm">
          <SidebarUserCard user={user} />
        </div>
      )}

      {/* Sign In Prompt */}
      {!user && (
        <div className="p-4 border-t border-white/10">
          <Link
            href="/auth"
            className="block w-full px-4 py-3 text-center rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold hover:scale-[1.02] transition-all"
          >
            Sign In
          </Link>
        </div>
      )}
    </aside>
  );
}
