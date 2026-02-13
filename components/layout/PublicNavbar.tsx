'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link
              href="/auth"
              className="text-text-60 hover:text-accent-orange transition-colors relative group focus:outline-none focus:text-accent-orange mr-4"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg transition-all hover:scale-105 focus:outline-none shadow-lg shadow-purple-600/20"
            >
              Get Started
            </Link>
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
              href="/auth"
              className="block text-text-60 hover:text-accent-orange transition-colors focus:outline-none focus:text-accent-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg transition-all hover:scale-105 text-center focus:outline-none shadow-lg shadow-purple-600/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
