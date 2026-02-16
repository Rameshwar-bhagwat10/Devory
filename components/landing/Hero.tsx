'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1 - Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]" />
      
      {/* Layer 2 - Enhanced Grid Overlay with Rounded Diamond Corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Grid Layer */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rounded-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 8 0 L 32 0 Q 40 0 40 8 L 40 32 Q 40 40 32 40 L 8 40 Q 0 40 0 32 L 0 8 Q 0 0 8 0 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rounded-grid)" />
          </svg>
        </div>
        
        {/* Glow Layer - Only affects grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.5] mix-blend-screen"
          style={{
            background: `radial-gradient(400px 250px ellipse at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15) 50%, transparent 100%)`,
            maskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 8 0 L 32 0 Q 40 0 40 8 L 40 32 Q 40 40 32 40 L 8 40 Q 0 40 0 32 L 0 8 Q 0 0 8 0 Z' fill='none' stroke='white' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 8 0 L 32 0 Q 40 0 40 8 L 40 32 Q 40 40 32 40 L 8 40 Q 0 40 0 32 L 0 8 Q 0 0 8 0 Z' fill='none' stroke='white' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            transition: 'background 0.05s ease-out'
          }}
        />
      </div>
      
      {/* Layer 3 - Premium Curved Arc Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-[5]">
        <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0" viewBox="0 0 1920 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="15%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="85%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
              <stop offset="20%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="80%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </linearGradient>
            <filter id="arc-blur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          
          {/* Glow Layer */}
          <path
            d="M 0 180 Q 960 120 1920 180"
            stroke="url(#glow-gradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#arc-blur)"
            opacity="0.6"
          />
          
          {/* Main Arc Line */}
          <path
            d="M 0 180 Q 960 120 1920 180"
            stroke="url(#arc-gradient)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-white/5 border border-white/10 text-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white/80">AI-Powered Project Intelligence</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-white">Build Smarter Projects</span>
            <br />
            <span className="text-white">With </span>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Driven Ideas
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            One platform to discover, collaborate, and execute structured projects with AI guidance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-103 transition-transform duration-300"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:border-purple-400/30 hover:bg-white/10 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm tracking-wide mt-6"
          >
            10,000+ Projects • 25+ Domains • 5,000+ Students
          </motion.div>
        </div>
      </div>
    </section>
  );
}
