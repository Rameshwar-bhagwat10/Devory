'use client';

import { motion } from 'framer-motion';
import { Search, Bookmark, Users } from 'lucide-react';
import { useState } from 'react';

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Start with middle item active

  const capabilities = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Find projects tailored to your skill level and interests',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      glowColor: 'rgba(168,85,247,0.6)',
    },
    {
      icon: Bookmark,
      title: 'Save & Organize',
      description: 'Bookmark ideas and build your personal project library',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59,130,246,0.6)',
    },
    {
      icon: Users,
      title: 'Community Ideas',
      description: 'Share and discover projects from fellow students',
      color: 'cyan',
      gradient: 'from-cyan-500 to-cyan-600',
      glowColor: 'rgba(6,182,212,0.6)',
    },
  ];

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
              Everything You Need
            </span>
          </h2>
          <p className="text-white/50 text-lg">Click to explore each capability</p>
        </motion.div>

        {/* Interactive Carousel-style Layout */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          {/* Capabilities */}
          <div className="flex items-center justify-center gap-8 w-full max-w-5xl">
            {capabilities.map((capability, index) => {
              const isActive = activeIndex === index;
              const offset = index - activeIndex;
              
              return (
                <motion.div
                  key={index}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                    x: offset * (isActive ? 0 : offset > 0 ? 50 : -50),
                    z: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => setActiveIndex(index)}
                  className="relative cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div className="relative group">
                    {/* Pulsing Glow - Only on Active */}
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-3xl blur-3xl"
                        style={{
                          background: capability.glowColor,
                        }}
                      />
                    )}

                    {/* Main Card */}
                    <motion.div
                      className={`relative w-80 rounded-3xl border-2 overflow-hidden ${
                        isActive ? 'border-white/20' : 'border-white/5'
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${capability.glowColor.replace('0.6', '0.15')}, transparent)`
                          : 'rgba(13, 13, 13, 0.5)',
                      }}
                    >
                      {/* Animated Border Gradient - Only on Active */}
                      {isActive && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `conic-gradient(from 0deg, transparent, ${capability.glowColor}, transparent)`,
                            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor',
                            padding: '2px',
                          }}
                        />
                      )}

                      {/* Content */}
                      <div className="relative p-8">
                        {/* Icon */}
                        <motion.div
                          animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-6 mx-auto`}
                          style={{
                            boxShadow: isActive ? `0 0 40px ${capability.glowColor}` : 'none',
                          }}
                        >
                          <capability.icon className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className={`text-2xl font-bold text-center mb-4 transition-colors ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}>
                          {capability.title}
                        </h3>

                        {/* Description - Only show on active */}
                        <motion.div
                          animate={{
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-center leading-relaxed">
                            {capability.description}
                          </p>
                        </motion.div>

                        {/* Decorative Elements - Only on active */}
                        {isActive && (
                          <>
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0],
                                  y: [0, -50],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: "easeOut",
                                }}
                                className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${capability.gradient}`}
                                style={{
                                  left: `${20 + i * 15}%`,
                                  bottom: '20%',
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {capabilities.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative"
            >
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1 : 0.7,
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${capabilities[index].gradient}`}
              />
              {activeIndex === index && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  style={{ padding: '4px' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: '10K+', label: 'Projects' },
            { value: '25+', label: 'Domains' },
            { value: '5K+', label: 'Students' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
