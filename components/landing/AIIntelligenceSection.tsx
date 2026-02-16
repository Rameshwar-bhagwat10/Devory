'use client';

import { motion } from 'framer-motion';
import { Sparkles, Layers, Clock, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AIIntelligenceSection() {
  const [skillMatch, setSkillMatch] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        setSkillMatch(current);
        if (current >= 92) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                A Smarter Way to Build Projects
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-[480px]">
              Devory provides <span className="text-purple-400 font-semibold">curated, structured project ideas</span> designed specifically for students who want to learn by building.
            </p>
            
            {/* Creative Feature Cards */}
            <div className="space-y-6">
              {/* Feature 1 - Curated Ideas */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <div className="flex items-start gap-4">
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Glow Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-purple-500/30 blur-lg"
                    />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      Curated Ideas
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Hand-picked projects across multiple domains
                    </p>
                    {/* Progress Bar */}
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 - Clear Structure */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div className="flex items-start gap-4">
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Glow Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute inset-0 rounded-full bg-blue-500/30 blur-lg"
                    />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <Layers className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Clear Structure
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Step-by-step guidance and learning paths
                    </p>
                    {/* Progress Bar */}
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 - Save Time */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative"
              >
                <div className="flex items-start gap-4">
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Glow Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute inset-0 rounded-full bg-cyan-500/30 blur-lg"
                    />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      Save Time
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Start building immediately with ready-to-use ideas
                    </p>
                    {/* Progress Bar */}
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Creative Orbital Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative min-h-[500px] flex items-center justify-center"
          >
            {/* Orbital Rings */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              animate={{ rotate: 360 }}
              style={{ animationDuration: '60s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
              className="absolute w-[400px] h-[400px] rounded-full border border-purple-500/20"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              animate={{ rotate: -360 }}
              style={{ animationDuration: '45s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
              className="absolute w-[320px] h-[320px] rounded-full border border-blue-500/20"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              animate={{ rotate: 360 }}
              style={{ animationDuration: '50s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
              className="absolute w-[240px] h-[240px] rounded-full border border-cyan-500/20"
            />

            {/* Central AI Core with Glow */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="relative z-20"
            >
              {/* Pulsing Glow Background */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-2xl"
              />
              
              {/* Core Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.4)]"
              >
                <div className="w-24 h-24 rounded-full bg-[#050810] flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Orbiting Feature Nodes */}
            {/* Node 1 - AI Roadmap */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute"
              style={{
                top: '15%',
                left: '15%',
              }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative p-4 rounded-xl border border-purple-500/30 backdrop-blur-sm bg-[#050810]/80">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <p className="text-xs text-purple-300 font-semibold">AI Roadmap</p>
                    </div>
                    <p className="text-sm text-white font-bold">12 Weeks</p>
                    <p className="text-xs text-white/50">Generated</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Node 2 - Skill Match */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute"
              style={{
                top: '10%',
                right: '10%',
              }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative p-4 rounded-xl border border-blue-500/30 backdrop-blur-sm bg-[#050810]/80">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <p className="text-xs text-blue-300 font-semibold">Skill Match</p>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {skillMatch}%
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Node 3 - Collaboration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute"
              style={{
                bottom: '20%',
                right: '15%',
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative p-4 rounded-xl border border-cyan-500/30 backdrop-blur-sm bg-[#050810]/80">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <p className="text-xs text-cyan-300 font-semibold">Collaboration</p>
                    </div>
                    <p className="text-sm text-white font-bold">3 Members</p>
                    <p className="text-xs text-white/50">Active Now</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Particle Effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 50 : -50)],
                  y: [0, (i % 3 === 0 ? -50 : 50)]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                style={{
                  top: `${30 + (i * 10)}%`,
                  left: `${40 + (i * 5)}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
