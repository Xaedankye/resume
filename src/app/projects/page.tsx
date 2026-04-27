'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AddProjectModal } from '@/components/projects/AddProjectModal';
import { 
  ArrowRight, 
  Code, 
  Users, 
  TrendingUp, 
  Database, 
  Server, 
  Box,
  Layers,
  ExternalLink,
  CheckCircle2,
  Clock,
  Zap,
  Plus,
  Users as UsersIcon
} from 'lucide-react';

const personaConfig = {
  developer: {
    icon: Code,
    label: 'Engineering Projects',
    description: 'Technical implementations and architectural decisions',
  },
  leadership: {
    icon: UsersIcon,
    label: 'Leadership Projects',
    description: 'Team initiatives and program deliveries',
  },
};

const componentIcons: Record<string, typeof Server> = {
  service: Server,
  database: Database,
  queue: Box,
  external: ExternalLink,
  cache: Zap,
  cdn: Layers,
};

export default function ProjectsPage() {
  const { persona } = usePersona();
  const searchParams = useSearchParams();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const config = personaConfig[persona];
  const personaFilter = persona === 'developer' ? 'engineering' : 'leadership';
  const filteredProjects = useMemo(() => 
    projects.filter(p => 
      p.persona === personaFilter || p.persona === 'both'
    ), [personaFilter]
  );
  
  useEffect(() => {
    const selectedParam = searchParams.get('selected');
    if (selectedParam) {
      const exists = projects.find(p => p.id === selectedParam);
      if (exists) {
        setSelectedProjectId(selectedParam);
      }
    }
  }, [searchParams]);

  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId)
    : filteredProjects[0];

  const handleAddProject = (projectJson: string) => {
    console.log('New project JSON:', projectJson);
    alert('Project JSON generated! In development, copy this to src/data/projects.ts:\n\n' + projectJson);
  };

  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Header />
      <div className="flex flex-1">
        <aside className="w-full md:w-80 border-r border-[var(--border)] bg-[var(--card)] md:fixed md:h-[calc(100vh-4rem)] overflow-y-auto pt-16 md:pt-0">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <config.icon size={20} className="text-[var(--accent)]" />
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
                    {config.label}
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-1.5 rounded-lg bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-opacity"
                  aria-label="Add new project"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                {config.description}
              </p>
            </div>
            
            <div className="space-y-2">
              {filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all duration-200',
                    selectedProject?.id === project.id
                      ? 'bg-[var(--accent)]/10 border-[var(--accent)]'
                      : 'bg-[var(--background)] border-[var(--border)] hover:border-[var(--accent)]/50'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--foreground)] truncate">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                    <ArrowRight 
                      size={16} 
                      className={cn(
                        'flex-shrink-0 mt-1 transition-transform',
                        selectedProject?.id === project.id ? 'text-[var(--accent)] rotate-90' : 'text-[var(--text-muted)]'
                      )}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.techStack.slice(0, 4).map(tech => (
                      <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 md:ml-80 p-6 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                    {selectedProject.title}
                  </h1>
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {selectedProject.metrics.map((metric, i) => (
                      <Card key={i} className="text-center p-4">
                        <div className="text-2xl font-bold text-[var(--accent)] mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-[var(--text-muted)]">
                          {metric.label}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedProject.overview && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-[var(--accent)]" />
                      Overview
                    </h2>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {selectedProject.overview}
                    </p>
                  </section>
                )}

                {selectedProject.problem && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                      The Challenge
                    </h2>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                      <p className="text-[var(--text-muted)] whitespace-pre-line">
                        {selectedProject.problem}
                      </p>
                    </div>
                  </section>
                )}

                {selectedProject.solution && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                      The Solution
                    </h2>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </section>
                )}

                {selectedProject.architecture && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                      <Layers size={20} className="text-[var(--accent)]" />
                      Architecture
                    </h2>
                    
                    <Card className="p-6">
                      <p className="text-[var(--text-muted)] mb-6">
                        {selectedProject.architecture.description}
                      </p>
                      
                      {selectedProject.architecture.components && (
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          {selectedProject.architecture.components.map((component, i) => {
                            const Icon = componentIcons[component.type] || Server;
                            return (
                              <div 
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
                              >
                                <div className="p-2 rounded-lg bg-[var(--accent)]/10">
                                  <Icon size={18} className="text-[var(--accent)]" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-[var(--foreground)] text-sm">
                                    {component.name}
                                  </h4>
                                  <p className="text-xs text-[var(--text-muted)]">
                                    {component.description}
                                  </p>
                                  {component.technologies && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {component.technologies.map(tech => (
                                        <Badge key={tech} variant="outline" className="text-[9px] px-1">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {selectedProject.architecture.flowDescription && (
                        <div className="p-4 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/20">
                          <h4 className="font-medium text-[var(--foreground)] mb-2 flex items-center gap-2">
                            <Clock size={14} className="text-[var(--accent)]" />
                            Data Flow
                          </h4>
                          <p className="text-sm text-[var(--text-muted)]">
                            {selectedProject.architecture.flowDescription}
                          </p>
                        </div>
                      )}
                    </Card>
                  </section>
                )}

                {selectedProject.lessonsLearned && selectedProject.lessonsLearned.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                      Key Takeaways
                    </h2>
                    <ul className="space-y-3">
                      {selectedProject.lessonsLearned.map((lesson, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--text-muted)]">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedProject.teamContribution && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                      <UsersIcon size={20} className="text-[var(--accent)]" />
                      My Contribution
                    </h2>
                    <Card className="p-6">
                      <p className="text-[var(--text-muted)] whitespace-pre-line">
                        {selectedProject.teamContribution}
                      </p>
                    </Card>
                  </section>
                )}

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(tech => (
                      <Badge key={tech} variant="default" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>

                {selectedProject.links && selectedProject.links.length > 0 && (
                  <section>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
                        >
                          {link.label}
                          <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <AddProjectModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProject}
        />
      </div>
      <Footer />
    </div>
  );
}