'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  const { persona } = usePersona();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const title = persona === 'developer' ? 'Expert Software Engineer' : 'Engineering & Technology Leader';
  const subtitle = persona === 'developer' 
    ? 'Building scalable systems with clean code and modern architecture'
    : 'Leading cross-functional engineering teams in Agile environments to deliver high-quality technology solutions';

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'var(--glow-color)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'var(--glow-color)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                             linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

{/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl items-center justify-between gap-8"
      >
        {/* Text Content */}
        <div className="flex-1 text-center">
        {/* Persona Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--text-muted)]">
            <Sparkles size={14} className="text-[var(--accent)]" />
            {persona === 'developer' ? 'Engineering' : 'Leadership'} Focus
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] md:text-7xl lg:text-8xl"
        >
          <span className="block">Hi, I'm</span>
          <motion.span
            className="block bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent pb-2"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Logan Stewart
          </motion.span>
        </motion.h1>

        {/* Role Title */}
        <motion.p
          variants={itemVariants}
          className="mb-4 text-xl font-medium text-[var(--accent)] md:text-2xl"
        >
          {title}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-8 mx-auto max-w-2xl text-lg text-[var(--text-muted)] md:text-xl"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-[var(--background)] transition-all hover:opacity-90 hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
        </div>

        {/* Photo (Leadership only) */}
        {persona === 'leadership' && (
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-[var(--border)]">
              <Image
                src="/logan-photo.png"
                alt="Logan Stewart"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={24} className="text-[var(--text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}