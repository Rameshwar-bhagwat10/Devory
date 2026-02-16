'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Hero-style Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Animated Background Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
        />

        {/* Main Content */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-400/50" />
            </motion.div>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 md:p-16 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d0d0d]/80 to-[#0d0d0d]/60 backdrop-blur-xl overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5" />

            {/* Animated Border Gradient */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-50"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(168,85,247,0.3), transparent, rgba(6,182,212,0.3), transparent)',
                maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1px',
              }}
            />

            <div className="relative text-center">
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Start Building?
                </span>
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
              >
                Join thousands of students turning ideas into reality with structured guidance and AI-powered insights
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white rounded-full overflow-hidden"
                  >
                    {/* Animated Gradient Background */}
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    />

                    {/* Shimmer Effect */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />

                    {/* Button Content */}
                    <span className="relative z-10">Get Started Free</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-gradient-to-r from-purple-500 to-cyan-500" />
                  </motion.button>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-white/50 text-sm"
                >
                  No credit card required
                </motion.div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex items-center justify-center gap-8 flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-[#0d0d0d] bg-gradient-to-br ${
                          i % 3 === 0 ? 'from-purple-500 to-purple-600' :
                          i % 3 === 1 ? 'from-blue-500 to-cyan-500' :
                          'from-cyan-500 to-purple-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">5,000+ students</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">4.9/5 rating</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
              style={{
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
