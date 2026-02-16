'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Zap } from 'lucide-react';

export default function TrustSection() {
  const features = [
    {
      icon: Award,
      title: 'Curated Quality',
      description: 'Every project vetted for educational value',
    },
    {
      icon: Shield,
      title: 'Structured Learning',
      description: 'Clear paths from beginner to advanced',
    },
    {
      icon: Zap,
      title: 'Real-World Skills',
      description: 'Build portfolio-worthy projects',
    },
  ];

  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Built for Academic Excellence
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Devory is designed with a focus on structured learning and practical skill development. 
            Every project idea is carefully curated to ensure educational value and real-world applicability.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-[#0d0d0d]/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
