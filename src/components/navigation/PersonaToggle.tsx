'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_WIDTH = 280;

export function PersonaToggle() {
  const { persona, togglePersona } = usePersona();

  return (
    <button
      onClick={togglePersona}
      className={cn(
        'relative flex items-center rounded-full h-10 px-1',
        'bg-[var(--card)] border border-[var(--border)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        'hover:border-[var(--accent)]/50 transition-all duration-200'
      )}
      style={{ width: TOTAL_WIDTH }}
      aria-label={`Switch to ${persona === 'developer' ? 'leadership' : 'developer'} persona`}
    >
      {/* Animated sliding background - subtle tint */}
      <motion.div
        className="absolute top-0 bottom-0"
        initial={false}
        animate={{
          left: persona === 'leadership' ? '50%' : '1px',
          width: 'calc(50% - 1px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        style={{ 
          background: 'var(--foreground)',
          opacity: 0.08,
          borderRadius: persona === 'leadership' ? '0 18px 18px 0' : '18px 0 0 18px',
        }}
      />

      {/* Developer side */}
      <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full">
        <Moon
          size={16}
          className={cn(
            'transition-colors duration-200',
            persona === 'developer' 
              ? 'text-[var(--accent)]' 
              : 'text-[var(--text-muted)]'
          )}
        />
        <span
          className={cn(
            'text-sm font-medium transition-colors duration-200 whitespace-nowrap',
            persona === 'developer' 
              ? 'text-[var(--accent)] font-semibold' 
              : 'text-[var(--text-muted)]'
          )}
        >
          Developer
        </span>
      </div>
      
      {/* Divider */}
      <div className={cn(
        'w-px h-6 my-auto',
        persona === 'leadership' ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
      )} />
      
      {/* Leadership side */}
      <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full">
        <span
          className={cn(
            'text-sm font-medium transition-colors duration-200 whitespace-nowrap',
            persona === 'leadership' 
              ? 'text-[var(--accent)] font-semibold' 
              : 'text-[var(--text-muted)]'
          )}
        >
          Leadership
        </span>
        <Sun
          size={16}
          className={cn(
            'transition-colors duration-200',
            persona === 'leadership' 
              ? 'text-[var(--accent)]' 
              : 'text-[var(--text-muted)]'
          )}
        />
      </div>
    </button>
  );
}