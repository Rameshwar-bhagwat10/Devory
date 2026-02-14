'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, PenSquare, Bell, User } from 'lucide-react';

interface MobileBottomNavProps {
  isAuthenticated: boolean;
}

const navItems = [
  { href: '/community', icon: Home, label: 'Feed' },
  { href: '/community?sortBy=trending', icon: TrendingUp, label: 'Trending' },
  { href: '/community/new', icon: PenSquare, label: 'Create', requiresAuth: true },
  { href: '/community/notifications', icon: Bell, label: 'Alerts', requiresAuth: true },
  { href: '/profile', icon: User, label: 'Profile', requiresAuth: true },
];

export default function MobileBottomNav({ isAuthenticated }: MobileBottomNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/community') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            // Skip auth-required items if not authenticated
            if (item.requiresAuth && !isAuthenticated) {
              return null;
            }

            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px]
                  ${active 
                    ? 'text-white bg-purple-500/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
                aria-label={item.label}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-purple-400' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Create Button */}
      {isAuthenticated && (
        <Link
          href="/community/new"
          className="fixed bottom-20 right-4 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30 hover:scale-110 transition-transform"
          aria-label="Create new post"
        >
          <PenSquare className="w-6 h-6" />
        </Link>
      )}
    </>
  );
}
