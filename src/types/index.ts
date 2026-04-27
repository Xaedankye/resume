// Persona types
export type Persona = 'developer' | 'leadership';

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  tagIds?: string[]; // Optional - references to tags
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
  featured: boolean;
  persona: 'engineering' | 'leadership' | 'both';
  
  // Deep dive content
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: ArchitectureSection;
  codeSnippets?: CodeSnippet[];
  lessonsLearned?: string[];
  teamContribution?: string;
}

export interface ArchitectureSection {
  description: string;
  components?: ArchitectureComponent[];
  diagramUrl?: string;
  diagramAlt?: string;
  flowDescription?: string;
}

export interface ArchitectureComponent {
  name: string;
  description: string;
  type: string; // Allow any type for flexibility
  technologies?: string[];
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description?: string;
}

// Certification types
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expirationDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
}

// Blog types
export type BlogCategory = 'technical' | 'management' | 'thoughts';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: BlogCategory;
  readingTime: number;
  tags: string[];
}

// Social types
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Skill/Tag types
export type TagCategory = 'language' | 'framework' | 'cloud' | 'practice' | 'domain' | 'tool';

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  description?: string;
}

// Experience types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
  highlights: string[];
  type: 'engineering' | 'management';
  achievements?: string[];
  tagIds?: string[]; // Optional - references to tags
  projectIds?: string[]; // Optional - references to projects
}

// Skill types
export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
}