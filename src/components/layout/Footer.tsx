'use client';

import { Mail, Phone, Linkedin, Github, Facebook } from 'lucide-react';
import { socials } from '@/data/socials';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] py-4 max-h-[150px] fixed bottom-0 w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} Logan Stewart. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              // Map social types to icons
              let Icon = Mail;
              switch (social.icon) {
                case 'phone': Icon = Phone; break;
                case 'linkedin': Icon = Linkedin; break;
                case 'github': Icon = Github; break;
                case 'facebook': Icon = Facebook; break;
              }
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
