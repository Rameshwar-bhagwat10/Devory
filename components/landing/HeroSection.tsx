'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const particleCount = isMobile ? 25 : window.innerWidth < 1024 ? 45 : 70;

    // Setup canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.04 + 0.04,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    setupCanvas();
    initParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      setupCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Mouse glow effect
  useEffect(() => {
    if (isMobile || !mouseGlowRef.current) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (mouseGlowRef.current) {
          mouseGlowRef.current.style.transform = `translate(${mouseX - 350}px, ${mouseY - 350}px)`;
        }
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden"
      data-section="hero"
    >
      {/* Layer 1: Gradient Mesh Base - Darker Deep Space Theme */}
      <div 
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.025) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(245, 158, 11, 0.015) 0%, transparent 50%),
            linear-gradient(to bottom, #050810 0%, #080b14 100%)
          `,
        }}
      />

      {/* Layer 2: Floating Glass Orbs - Reduced Opacity */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Orb 1 - Blue */}
        <div 
          className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            opacity: 0.4,
            animationDelay: '0s',
            animationDuration: '16s',
          }}
        />
        
        {/* Orb 2 - Purple */}
        <div 
          className="absolute top-1/4 -right-32 w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
            opacity: 0.35,
            animationDelay: '-4s',
            animationDuration: '18s',
          }}
        />
        
        {/* Orb 3 - Cyan */}
        <div 
          className="absolute bottom-20 left-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            opacity: 0.3,
            animationDelay: '-2s',
            animationDuration: '14s',
          }}
        />
        
        {/* Orb 4 - Amber */}
        <div 
          className="absolute -bottom-32 right-1/3 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            opacity: 0.25,
            animationDelay: '-6s',
            animationDuration: '15s',
          }}
        />
      </div>

      {/* Layer 3: Subtle Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-8 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      {/* Layer 4: Particle Field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none select-none"
        style={{ zIndex: 3 }}
      />

      {/* Layer 5: Interactive Mouse Glow - Very Subtle */}
      {!isMobile && (
        <div
          ref={mouseGlowRef}
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none select-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
            zIndex: 4,
            transform: 'translate(-350px, -350px)',
          }}
        />
      )}

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="space-y-8 animate-fade-up">
          {/* Main Headline with Purple-Cyan-Blue Gradient */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em]"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Discover</span>
              <span className="text-white"> Your Next</span>
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Project Idea
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-xl md:text-2xl text-gray-300/90 max-w-[42ch] mx-auto leading-relaxed tracking-[-0.01em]"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            A curated platform for students to explore structured project ideas across multiple domains
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {/* Primary CTA - Purple-Blue-Cyan Gradient */}
            <Link
              href="/auth"
              className="group relative px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-2xl shadow-purple-600/20 hover:shadow-purple-600/30"
            >
              Get Started
            </Link>
            
            {/* Secondary CTA */}
            <Link
              href="/projects"
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(-10px);
          }
        }

        .animate-float {
          animation: float 16s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}
