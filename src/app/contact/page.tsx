import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { socials } from '@/data/socials';
import { Mail, Phone, Linkedin, Github, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  email: Mail,
  phone: Phone,
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-150px)] pt-16">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 pb-[150px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            Feel free to reach out through any of these channels
          </p>
        </div>

        <div className="grid gap-4 max-w-md mx-auto">
          {socials.map((social) => {
            const Icon = iconMap[social.icon] || Mail;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border border-[var(--border)]',
                  'bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                  'transition-all duration-200 group'
                )}
              >
                <div className="p-3 rounded-lg bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/20 transition-colors">
                  <Icon size={24} className="text-[var(--accent)]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--foreground)]">
                    {social.name}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] truncate">
                    {social.url.replace(/^(mailto:|tel:)/, '')}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
