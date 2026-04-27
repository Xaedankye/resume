'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';
import { workHistory } from '@/data/workHistory';
import { tags, getTagsByIds } from '@/data/tags';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { 
  Briefcase, 
  Code, 
  MapPin, 
  Calendar,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  FolderKanban,
  ExternalLink,
  Hash
} from 'lucide-react';

const typeConfig = {
  engineering: {
    icon: Code,
    label: 'Engineering',
    color: 'text-[var(--accent)]',
  },
  management: {
    icon: Users,
    label: 'Leadership',
    color: 'text-[var(--accent)]',
  },
};

const categoryColors: Record<string, string> = {
  language: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  framework: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  cloud: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  practice: 'bg-green-500/20 text-green-400 border-green-500/30',
  domain: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  tool: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

// Project ID to name mapping
const projectNames: Record<string, string> = {
  'event-driven-oms': 'Shipper 360 Order Management System',
  'tracking-system': 'Real-time Tracking Management System',
  'offer-management': 'Offer Management System',
  'tms-migration': 'Legacy TMS Migration',
  'driver-app': 'Driver Mobile Application',
  'customer-portal': 'Customer Self-Service Portal',
  'load-management': 'Load Management System',
  'dispatch-optimization': 'Dispatch Optimization Engine',
};

export default function WorkHistoryPage() {
  const { persona } = usePersona();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(workHistory[0]?.id || '');

  // Sort by date (most recent first)
  const sortedHistory = [...workHistory].sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  const selectedExperience = workHistory.find(e => e.id === selectedRoleId) || sortedHistory[0];
  const selectedTags = getTagsByIds(selectedExperience.tagIds);
  const selectedProjects = (selectedExperience.projectIds || []).map(id => ({ 
    id, 
    name: projectNames[id] || id 
  }));

  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
              Work History
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              A timeline of my journey from software engineering to technical leadership
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[var(--border)]" />

              {/* Timeline Items */}
              <div className="space-y-6">
                {sortedHistory.map((experience, index) => {
                  const config = typeConfig[experience.type];
                  const Icon = config.icon;
                  const isSelected = selectedExperience?.id === experience.id;
                  const roleTags = getTagsByIds(experience.tagIds);

                  return (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start gap-4 pl-12"
                    >
                      {/* Timeline Dot - centered on the vertical line */}
                      <button
                        onClick={() => setSelectedRoleId(experience.id)}
                        className={cn(
                          'absolute left-[15px] top-5 w-3 h-3 rounded-full transition-all duration-300 z-10',
                          isSelected 
                            ? 'bg-[var(--accent)] scale-150 shadow-lg shadow-[var(--accent)]/30' 
                            : 'bg-[var(--border)] hover:bg-[var(--accent)]/50'
                        )}
                      />

                      {/* Card */}
                      <button
                        onClick={() => setSelectedRoleId(experience.id)}
                        className={cn(
                          'w-full text-left p-5 rounded-xl border transition-all duration-300',
                          isSelected
                            ? 'bg-[var(--card)] border-[var(--accent)] shadow-lg'
                            : 'bg-[var(--card)]/50 border-[var(--border)] hover:border-[var(--accent)]/50'
                        )}
                      >
                        {/* Date & Current Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={experience.isCurrent ? 'accent' : 'outline'} className="text-xs">
                            {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                          </Badge>
                          {experience.isCurrent && (
                            <span className="flex items-center gap-1 text-xs text-[var(--accent)]">
                              <Star size={10} fill="currentColor" />
                              Current
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-[var(--accent)] font-medium mb-1">
                          {experience.company}
                        </p>

                        {/* Location */}
                        {experience.location && (
                          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-3">
                            <MapPin size={12} />
                            {experience.location}
                          </div>
                        )}

                        {/* Type & Tags */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            <Icon size={10} className="mr-1" />
                            {config.label}
                          </Badge>
                          {roleTags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="outline" className="text-[10px] px-1.5 py-0">
                              {tag.name}
                            </Badge>
                          ))}
                          {roleTags.length > 3 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              +{roleTags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Selected Role Details */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <AnimatePresence mode="wait">
                {selectedExperience && (
                  <motion.div
                    key={selectedExperience.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-6 md:p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={selectedExperience.isCurrent ? 'accent' : 'default'}>
                            {selectedExperience.startDate} - {selectedExperience.isCurrent ? 'Present' : selectedExperience.endDate}
                          </Badge>
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                          {selectedExperience.title}
                        </h2>
                        <p className="text-[var(--accent)] font-medium mb-2">
                          {selectedExperience.company}
                        </p>
                        {selectedExperience.location && (
                          <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                            <MapPin size={14} />
                            {selectedExperience.location}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                        {selectedExperience.description}
                      </p>

                      {/* Skills/Tags */}
                      {selectedTags.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                            <Hash size={14} className="text-[var(--accent)]" />
                            Skills & Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                              <Link
                                key={tag.id}
                                href={`/projects?tag=${tag.id}`}
                                className={cn(
                                  'px-2.5 py-1 rounded-full text-xs border transition-colors hover:opacity-80',
                                  categoryColors[tag.category] || 'bg-[var(--muted)] text-[var(--foreground)] border-[var(--border)]'
                                )}
                              >
                                {tag.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                          <TrendingUp size={14} className="text-[var(--accent)]" />
                          Key Responsibilities
                        </h3>
                        <ul className="space-y-2">
                          {selectedExperience.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                              <ArrowRight size={14} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Related Projects */}
                      {selectedProjects.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border)]">
                          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                            <FolderKanban size={14} className="text-[var(--accent)]" />
                            Related Projects
                          </h3>
                          <div className="space-y-2">
                            {selectedProjects.map((project) => (
                              <Link
                                key={project.id}
                                href={`/projects?selected=${project.id}`}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group text-sm"
                              >
                                <span className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                  {project.name}
                                </span>
                                <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}