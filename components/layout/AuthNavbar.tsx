'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { NotificationDropdown } from './NotificationDropdown';

export default function AuthNavbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    
    return undefined;
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
    
    return undefined;
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

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
      
      {/* Gradient overlay for depth - only visible when scrolled */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity" style={{ fontFamily: 'cursive' }}>
              Devory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              prefetch={true}
              className="text-text-60 hover:text-accent-orange transition-colors relative group focus:outline-none focus:text-accent-orange"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/projects"
              className="text-text-60 hover:text-accent-orange transition-colors relative group focus:outline-none focus:text-accent-orange"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/community"
              className="text-text-60 hover:text-accent-orange transition-colors relative group focus:outline-none focus:text-accent-orange"
            >
              Community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-primary text-white font-semibold flex items-center justify-center hover:scale-110 transition-all focus:outline-none shadow-lg shadow-accent-orange/30"
                aria-label="Profile menu"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {getInitials(session?.user?.email)}
              </button>

              {/* Dropdown Menu with Glassmorphism */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl">
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10"></div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-text-60">Signed in as</p>
                      <p className="text-sm text-text-90 font-medium truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-text-60 hover:bg-white/5 hover:text-accent-orange transition-colors focus:outline-none focus:bg-white/5 focus:text-accent-orange"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/saved"
                        className="block px-4 py-2 text-text-60 hover:bg-white/5 hover:text-accent-orange transition-colors focus:outline-none focus:bg-white/5 focus:text-accent-orange"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Saved Projects
                      </Link>
                      <Link
                        href="/community/new"
                        className="block px-4 py-2 text-text-60 hover:bg-white/5 hover:text-accent-orange transition-colors focus:outline-none focus:bg-white/5 focus:text-accent-orange"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Post Idea
                      </Link>
                    </div>

                    <div className="border-t border-white/10 py-2">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left px-4 py-2 text-error hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-white/5"
                      >
                        {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange rounded"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            <div className="px-4 py-2 border-b border-white/10 mb-3">
              <p className="text-sm text-text-60">Signed in as</p>
              <p className="text-sm text-text-90 font-medium truncate">
                {session?.user?.email}
              </p>
            </div>

            <Link
              href="/dashboard"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/community"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/profile"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/saved"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Saved Projects
            </Link>
            <Link
              href="/community/new"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Post Idea
            </Link>
            
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left text-error hover:text-error/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
              >
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
