'use client';

import { useSession } from 'next-auth/react';
import PublicNavbar from './PublicNavbar';
import AuthNavbar from './AuthNavbar';

export default function Navbar() {
  const { data: session, status } = useSession();
  
  // Loading state - show neutral placeholder
  if (status === 'loading') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Devory</div>
          <div className="w-20 h-10 bg-glass-10 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }
  
  // Render appropriate navbar based on authentication state
  if (session?.user) {
    return <AuthNavbar />;
  }
  
  return <PublicNavbar />;
}
