'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'glow' | 'wave';
}

export default function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'gradient') {
    return (
      <div className="relative w-full h-px my-16 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 via-blue-500/30 via-cyan-500/30 to-transparent"
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 my-16">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`w-2 h-2 rounded-full ${
              i === 2 
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 w-3 h-3' 
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'glow') {
    return (
      <div className="relative w-full h-24 my-8 flex items-center justify-center overflow-hidden">
        {/* Glowing orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
          </div>
        </motion.div>

        {/* Lines extending from orb */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-0 right-1/2 h-px bg-gradient-to-r from-transparent to-white/20 mr-16"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-1/2 right-0 h-px bg-gradient-to-l from-transparent to-white/20 ml-16"
        />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className="relative w-full h-16 my-12 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,20 Q300,5 600,20 T1200,20"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0)" />
              <stop offset="25%" stopColor="rgba(168,85,247,0.5)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="75%" stopColor="rgba(6,182,212,0.5)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
}
