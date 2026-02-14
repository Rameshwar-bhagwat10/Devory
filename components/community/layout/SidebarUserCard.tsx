'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LogOut, Award } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SidebarUserCardProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function SidebarUserCard({ user }: SidebarUserCardProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-purple-500/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050810]"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {user.name || 'User'}
          </p>
          <div className="flex items-center gap-1 text-xs text-white/50">
            <Award className="w-3 h-3" />
            <span>0 points</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-all disabled:opacity-50"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
