'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Persona } from '@/types';

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  togglePersona: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

const STORAGE_KEY = 'resume-persona';

function PersonaContextInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [persona, setPersonaState] = useState<Persona>('developer');
  const [mounted, setMounted] = useState(false);

  // Initialize from URL or localStorage on mount
  useEffect(() => {
    setMounted(true);
    const urlPersona = searchParams.get('persona');
    if (urlPersona === 'developer' || urlPersona === 'leadership') {
      setPersonaState(urlPersona);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'developer' || stored === 'leadership') {
        setPersonaState(stored);
      }
    }
  }, [searchParams]);

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    localStorage.setItem(STORAGE_KEY, newPersona);
    
    // Update URL without full navigation
    const url = new URL(window.location.href);
    url.searchParams.set('persona', newPersona);
    router.replace(url.toString(), { scroll: false });
    
    // Update document attribute for CSS selectors
    document.documentElement.setAttribute('data-persona', newPersona);
  };

  const togglePersona = () => {
    const newPersona = persona === 'developer' ? 'leadership' : 'developer';
    setPersona(newPersona);
  };

  // Apply theme on mount and persona change
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-persona', persona);
    }
  }, [persona, mounted]);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, togglePersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  return (
    <PersonaContextInner>
      {children}
    </PersonaContextInner>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}