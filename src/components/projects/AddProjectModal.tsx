'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Code, FileJson, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string;
  tagIds: string;
  metrics: string;
  links: string;
  featured: boolean;
  persona: 'engineering' | 'management' | 'both';
  overview: string;
  problem: string;
  solution: string;
  lessonsLearned: string;
  teamContribution: string;
}

const defaultFormData: ProjectFormData = {
  id: '',
  title: '',
  description: '',
  shortDescription: '',
  techStack: '',
  tagIds: '',
  metrics: '',
  links: '',
  featured: false,
  persona: 'engineering',
  overview: '',
  problem: '',
  solution: '',
  lessonsLearned: '',
  teamContribution: '',
};

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (projectJson: string) => void;
}

export function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [mode, setMode] = useState<'form' | 'bulk'>('form');
  const [bulkJson, setBulkJson] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const validateAndSubmit = () => {
    const newErrors: string[] = [];
    
    if (!formData.id.trim()) newErrors.push('ID is required');
    if (!formData.title.trim()) newErrors.push('Title is required');
    if (!formData.description.trim()) newErrors.push('Description is required');
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build the project object
    const project = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      shortDescription: formData.shortDescription || formData.description.slice(0, 100),
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
      tagIds: formData.tagIds.split(',').map(t => t.trim()).filter(Boolean),
      metrics: formData.metrics ? JSON.parse(formData.metrics) : [],
      links: formData.links ? JSON.parse(formData.links) : [],
      featured: formData.featured,
      persona: formData.persona,
      overview: formData.overview,
      problem: formData.problem,
      solution: formData.solution,
      lessonsLearned: formData.lessonsLearned ? formData.lessonsLearned.split('\n').filter(Boolean) : [],
      teamContribution: formData.teamContribution,
    };

    onAdd(JSON.stringify(project, null, 2));
    setFormData(defaultFormData);
    onClose();
  };

  const handleBulkSubmit = () => {
    try {
      JSON.parse(bulkJson);
      onAdd(bulkJson);
      setBulkJson('');
      onClose();
    } catch {
      setErrors(['Invalid JSON - please check your syntax']);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">Add New Project</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 p-4 border-b border-[var(--border)]">
            <button
              onClick={() => setMode('form')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                mode === 'form' 
                  ? 'bg-[var(--accent)] text-[var(--background)]' 
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
              )}
            >
              <Code size={16} />
              Form
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                mode === 'bulk' 
                  ? 'bg-[var(--accent)] text-[var(--background)]' 
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
              )}
            >
              <FileJson size={16} />
              Bulk JSON
            </button>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              {errors.map((error, i) => (
                <p key={i} className="text-sm text-red-400">{error}</p>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {mode === 'form' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      ID *
                    </label>
                    <input
                      type="text"
                      value={formData.id}
                      onChange={e => handleInputChange('id', e.target.value)}
                      placeholder="event-driven-oms"
                      className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => handleInputChange('title', e.target.value)}
                      placeholder="Order Management System"
                      className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    placeholder="Full description of the project..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={e => handleInputChange('techStack', e.target.value)}
                    placeholder="React, Node.js, PostgreSQL, AWS"
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Tag IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tagIds}
                    onChange={e => handleInputChange('tagIds', e.target.value)}
                    placeholder="react, nodejs, aws, kubernetes"
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Metrics (JSON array)
                  </label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={e => handleInputChange('metrics', e.target.value)}
                    placeholder='[{"label": "Users", "value": "10K+"}]'
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Persona
                    </label>
                    <select
                      value={formData.persona}
                      onChange={e => handleInputChange('persona', e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option value="engineering">Engineering</option>
                      <option value="management">Management</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={e => handleInputChange('featured', e.target.checked)}
                        className="w-4 h-4 accent-[var(--accent)]"
                      />
                      <span className="text-sm text-[var(--foreground)]">Featured Project</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Overview
                  </label>
                  <textarea
                    value={formData.overview}
                    onChange={e => handleInputChange('overview', e.target.value)}
                    placeholder="Detailed overview of the project..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Problem
                  </label>
                  <textarea
                    value={formData.problem}
                    onChange={e => handleInputChange('problem', e.target.value)}
                    placeholder="What problem does this solve?"
                    rows={2}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Solution
                  </label>
                  <textarea
                    value={formData.solution}
                    onChange={e => handleInputChange('solution', e.target.value)}
                    placeholder="How was it solved?"
                    rows={2}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Team Contribution
                  </label>
                  <textarea
                    value={formData.teamContribution}
                    onChange={e => handleInputChange('teamContribution', e.target.value)}
                    placeholder="My role and contributions..."
                    rows={2}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-muted)]">
                  Paste your complete project JSON below. The JSON should be an object matching the Project type.
                </p>
                <textarea
                  value={bulkJson}
                  onChange={e => setBulkJson(e.target.value)}
                  placeholder={`{
  "id": "my-project",
  "title": "My Project",
  "description": "Description here",
  ...
}`}
                  rows={20}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm font-mono focus:outline-none focus:border-[var(--accent)] resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--muted)] rounded-lg hover:bg-[var(--border)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={mode === 'form' ? validateAndSubmit : handleBulkSubmit}
              className="px-4 py-2 text-sm font-medium text-[var(--background)] bg-[var(--accent)] rounded-lg hover:opacity-90 transition-colors"
            >
              Add Project
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}