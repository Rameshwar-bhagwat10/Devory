'use client';

import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';

export default function ChallengeSection() {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              The Challenge Students Face
            </span>
          </h2>
          <p className="text-white/50 text-lg">Sound familiar?</p>
        </motion.div>

        {/* Creative Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-cyan-500/50 hidden md:block" />

          {/* Challenge 1 - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-16 md:mb-24"
          >
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="flex items-center gap-3 mb-3 md:justify-end">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Idea Paralysis</h3>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md md:ml-auto">
                    Staring at a blank screen, overwhelmed by endless possibilities. 
                    <span className="block mt-2 text-white/40 italic">
                      &quot;Should I build a todo app? A social network? Something with AI?&quot;
                    </span>
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <span className="text-purple-400 text-sm font-semibold">73% of students</span>
                    <span className="text-white/40 text-sm">struggle here</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 top-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-[#050810] hidden md:block -translate-x-1/2 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
          </motion.div>

          {/* Challenge 2 - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mb-16 md:mb-24"
          >
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="hidden md:block" />
              <div className="mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Lack of Structure</h3>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md">
                    You have an idea, but no roadmap. No clear steps. No learning path.
                    <span className="block mt-2 text-white/40 italic">
                      &quot;Where do I even start? What tech stack? What features first?&quot;
                    </span>
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <span className="text-blue-400 text-sm font-semibold">85% abandon</span>
                    <span className="text-white/40 text-sm">within first week</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#050810] hidden md:block -translate-x-1/2 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </motion.div>

          {/* Challenge 3 - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="flex items-center gap-3 mb-3 md:justify-end">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Wasted Time</h3>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md md:ml-auto">
                    Hours spent browsing Reddit, YouTube, and GitHub for &quot;the perfect project.&quot;
                    <span className="block mt-2 text-white/40 italic">
                      &quot;Maybe just one more tutorial... one more article...&quot;
                    </span>
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 text-sm font-semibold">12+ hours/week</span>
                    <span className="text-white/40 text-sm">just searching</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 top-6 w-4 h-4 bg-cyan-500 rounded-full border-4 border-[#050810] hidden md:block -translate-x-1/2 shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10">
            <p className="text-white/70">
              <span className="text-white font-semibold">The result?</span> Projects never get built. Skills never get learned.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
