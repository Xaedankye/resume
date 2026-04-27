'use client';

import { Mail, Phone, Linkedin, Github, Facebook } from 'lucide-react';
import { socials } from '@/data/socials';

export function Footer() {
  // Map social types to icons
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'linkedin':
        return Linkedin;
      case 'github':
        return Github;
      case 'facebook':
        return Facebook;
      default:
        return Mail;
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} Logan Stewart. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}