'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import PublicNavbar from './PublicNavbar';
import AuthNavbar from './AuthNavbar';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Loading state - show neutral placeholder with conditional glassmorphism
  if (status === 'loading') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Glassmorphism background - only visible when scrolled */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled 
              ? 'bg-dark-base/80 backdrop-blur-xl opacity-100' 
              : 'bg-transparent backdrop-blur-none opacity-0'
          }`}
        ></div>
        
        {/* Gradient overlay - only visible when scrolled */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        <div className="relative container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Devory</div>
          <div className="w-20 h-10 bg-white/10 rounded animate-pulse"></div>
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
