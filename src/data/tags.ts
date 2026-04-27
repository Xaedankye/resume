// Centralized tag/skill definitions
// All tags referenced throughout the site should be defined here
// Categories help organize and filter

export type TagCategory = 'language' | 'framework' | 'cloud' | 'practice' | 'domain' | 'tool';

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  description?: string;
}

export const tags: Tag[] = [
  // Languages
  { id: 'java', name: 'Java', category: 'language' },
  { id: 'python', name: 'Python', category: 'language' },
  { id: 'javascript', name: 'JavaScript', category: 'language' },
  { id: 'typescript', name: 'TypeScript', category: 'language' },
  { id: 'go', name: 'Go', category: 'language' },

  // Frameworks
  { id: 'angular', name: 'Angular', category: 'framework' },
  { id: 'react', name: 'React', category: 'framework' },
  { id: 'spring-boot', name: 'Spring Boot', category: 'framework' },
  { id: 'nodejs', name: 'Node.js', category: 'framework' },
  { id: 'nextjs', name: 'Next.js', category: 'framework' },

  // Cloud & Infrastructure
  { id: 'aws', name: 'AWS', category: 'cloud' },
  { id: 'azure-devops', name: 'Azure DevOps', category: 'cloud' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'cloud' },
  { id: 'docker', name: 'Docker', category: 'cloud' },
  { id: 'kafka', name: 'Kafka', category: 'cloud' },

  // Practices
  { id: 'agile', name: 'Agile', category: 'practice' },
  { id: 'scrum', name: 'Scrum', category: 'practice' },
  { id: 'sdlc', name: 'SDLC', category: 'practice' },
  { id: 'mentoring', name: 'Mentoring', category: 'practice' },
  { id: 'coaching', name: 'Coaching', category: 'practice' },
  { id: 'architecture', name: 'System Architecture', category: 'practice' },
  { id: 'ai', name: 'Artificial Intelligence', category: 'practice' },

  // Domain
  { id: 'oms', name: 'Order Management', category: 'domain' },
  { id: 'logistics', name: 'Logistics', category: 'domain' },
  { id: 'tms', name: 'Transportation Management', category: 'domain' },
  { id: 'tracking', name: 'Real-time Tracking', category: 'domain' },
];

// Helper to get tag by ID
export function getTag(id: string): Tag | undefined {
  return tags.find(t => t.id === id);
}

// Helper to get tags by category
export function getTagsByCategory(category: TagCategory): Tag[] {
  return tags.filter(t => t.category === category);
}

// Helper to get tags by IDs (handles undefined)
export function getTagsByIds(ids: string[] | undefined): Tag[] {
  if (!ids) return [];
  return ids.map(id => getTag(id)).filter((t): t is Tag => t !== undefined);
}