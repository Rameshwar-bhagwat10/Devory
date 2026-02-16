'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { UserPlus, Compass, Rocket } from 'lucide-react';
import { useRef } from 'react';

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your free account and tell us about your interests and skill level',
      gradient: 'from-purple-500 to-purple-600',
      glowColor: 'rgba(168,85,247,0.4)',
      delay: 0.2,
    },
    {
      number: 2,
      icon: Compass,
      title: 'Explore Ideas',
      description: 'Browse curated project ideas across web development, AI, blockchain, and more',
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59,130,246,0.4)',
      delay: 0.4,
    },
    {
      number: 3,
      icon: Rocket,
      title: 'Start Building',
      description: 'Follow structured guidance and bring your chosen project to life',
      gradient: 'from-cyan-500 to-purple-500',
      glowColor: 'rgba(6,182,212,0.4)',
      delay: 0.6,
    },
  ];

  return (
    <section ref={containerRef} className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-white/50 text-lg">Three simple steps to start building</p>
        </motion.div>

        {/* Animated Progress Path */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 rounded-full"
              style={{
                scaleY: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
                transformOrigin: 'top',
              }}
            />
            <div className="absolute inset-0 bg-white/10 rounded-full" />
          </div>

          {/* Steps */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: step.delay }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col gap-8`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="inline-block"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Icon Node */}
                <div className="relative flex-shrink-0 z-10">
                  {/* Animated Rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: step.glowColor,
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Outer Ring */}
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: step.delay }}
                    className="relative w-40 h-40 rounded-full border-2 border-white/10 flex items-center justify-center"
                  >
                    {/* Inner Gradient Circle */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.6 }}
                      className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center relative overflow-hidden`}
                      style={{
                        boxShadow: `0 0 40px ${step.glowColor}`,
                      }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />

                      {/* Icon */}
                      <step.icon className="w-16 h-16 text-white relative z-10" />

                      {/* Number Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: step.delay + 0.3, type: "spring" }}
                        className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center text-lg shadow-lg"
                      >
                        {step.number}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Orbiting Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      <div
                        className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`}
                        style={{
                          top: '50%',
                          left: '100%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Visual Side - Animated Illustration */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: step.delay + 0.2 }}
                    className="relative w-48 h-48"
                  >
                    {/* Background Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
                      style={{ background: step.glowColor }}
                    />

                    {/* Animated Shapes */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {index === 0 && (
                        // Sign Up - User Icon Animation
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="relative"
                        >
                          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} opacity-20`} />
                          <div className={`absolute top-2 left-2 w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} opacity-40`} />
                          <div className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient}`} />
                        </motion.div>
                      )}

                      {index === 1 && (
                        // Explore - Grid Animation
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(9)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: step.delay + 0.3 + i * 0.05 }}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              style={{ animationDelay: `${i * 0.2}s` }}
                              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.gradient}`}
                            />
                          ))}
                        </div>
                      )}

                      {index === 2 && (
                        // Start Building - Rocket Trail
                        <motion.div
                          animate={{ y: [20, -20] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                          className="relative"
                        >
                          <div className={`w-16 h-20 rounded-t-full bg-gradient-to-br ${step.gradient}`} />
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                opacity: [0, 0.6, 0],
                                scale: [0.5, 1, 1.5],
                                y: [0, 20, 40],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                              className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient}`}
                              style={{ top: '100%' }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                    i === 0 ? 'from-purple-500 to-purple-600' :
                    i === 1 ? 'from-blue-500 to-cyan-500' :
                    'from-cyan-500 to-purple-500'
                  } border-2 border-[#050810]`}
                />
              ))}
            </div>
            <p className="text-white/70">
              <span className="text-white font-semibold">Join 5,000+ students</span> already building
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
