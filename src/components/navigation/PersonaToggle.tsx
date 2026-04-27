'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';
import { Code, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PersonaToggle() {
  const { persona, togglePersona } = usePersona();

  return (
    <button
      onClick={togglePersona}
      className={cn(
        'relative flex items-center rounded-full p-0.5',
        'bg-[var(--muted)] border border-[var(--border)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        'transition-colors duration-200'
      )}
      aria-label={`Switch to ${persona === 'developer' ? 'leadership' : 'developer'} persona`}
    >
      <motion.div
        className="absolute h-7 rounded-full shadow-sm"
        initial={false}
        animate={{
          x: persona === 'leadership' ? 60 : 2,
          width: 60,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
      <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 w-[60px] justify-center">
        <Code
          size={14}
          className={cn(
            'transition-colors duration-200',
            persona === 'developer' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
          )}
        />
        <span
          className={cn(
            'text-xs font-medium transition-colors duration-200 whitespace-nowrap',
            persona === 'developer' ? 'text-[var(--foreground)]' : 'text-[var(--text-muted)]'
          )}
        >
          Dev
        </span>
      </div>
      <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 w-[60px] justify-center">
        <Briefcase
          size={14}
          className={cn(
            'transition-colors duration-200',
            persona === 'leadership' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
          )}
        />
        <span
          className={cn(
            'text-xs font-medium transition-colors duration-200 whitespace-nowrap',
            persona === 'leadership' ? 'text-[var(--foreground)]' : 'text-[var(--text-muted)]'
          )}
        >
          Leader
        </span>
      </div>
    </button>
  );
}