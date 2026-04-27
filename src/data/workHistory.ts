import type { Experience } from '@/types';

export const workHistory: Experience[] = [
  {
    id: 'senior-software-architect',
    title: 'Senior Software Architect',
    company: 'Just Right Reader',
    location: 'Remote',
    startDate: 'January 2025',
    endDate: 'Present',
    isCurrent: true,
    description: 'Systems Architect and Senior Manager with 15+ years of experience navigating complex technical and business landscapes. Bridging the gap between high-capacity engineering and strategic leadership.',
    highlights: [
      'Leading architectural decisions for enterprise-scale platform development',
      'Balancing feature-rich development with business urgency',
      'Aligning engineering velocity with organizational priorities',
    ],
    type: 'engineering',
    tagIds: ['java', 'python', 'typescript', 'architecture', 'ai'],
    projectIds: [],
  },
  {
    id: 'manager-ii',
    title: 'Manager II',
    company: 'J.B. Hunt Transport Services, Inc.',
    location: 'Remote',
    startDate: 'December 2020',
    endDate: 'January 2025',
    isCurrent: false,
    description: 'Senior leadership role responsible for order management systems and real-time tracking integrations.',
    highlights: [
      'Designed and led implementation of order management system for internal and external customers',
      'Implemented real-time tracking system integrated with multiple third-party vendors',
      'Established relationships with 3PL and 4PL fulfillment partners, integrating with their systems',
      'Developed SLA KPIs and real-time tracking capabilities',
      'Migrated fragmented legacy TMS into new platform with 100% uptime',
    ],
    type: 'management',
    tagIds: ['angular', 'java', 'azure-devops', 'aws', 'architecture', 'agile', 'scrum'],
    projectIds: ['event-driven-oms', 'tracking-system', 'offer-management', 'tms-migration'],
  },
  {
    id: 'manager-jb-hunt',
    title: 'Manager',
    company: 'J.B. Hunt Transport Services, Inc.',
    location: 'Arkansas, United States',
    startDate: 'August 2018',
    endDate: 'December 2020',
    isCurrent: false,
    description: 'Led multiple Agile teams in developing scalable, enterprise-level software solutions for logistics and transportation operations.',
    highlights: [
      'Directed teams responsible for Angular and Java-based applications',
      'Championed Agile transformations with sprint planning, retrospectives, and backlog grooming',
      'Partnered with stakeholders to define technical requirements',
      'Achieved 15% reduction in project delivery times',
      'Improved team efficiency by over 20% through process optimizations',
    ],
    type: 'management',
    tagIds: ['angular', 'java', 'scrum', 'sdlc', 'agile', 'mentoring', 'coaching'],
    projectIds: ['driver-app', 'customer-portal'],
  },
  {
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    company: 'J.B. Hunt Transport Services, Inc.',
    location: 'Arkansas, United States',
    startDate: 'August 2015',
    endDate: 'August 2018',
    isCurrent: false,
    description: 'Full-stack development on enterprise applications for transportation and logistics operations.',
    highlights: [
      'Designed and implemented front-end and back-end features using Angular and Java',
      'Optimized application performance and user experience',
      'Identified and resolved critical system bottlenecks',
      'Collaborated with QA teams for reliable deployment pipelines',
      'Mentored junior developers on coding standards and best practices',
    ],
    type: 'engineering',
    tagIds: ['angular', 'java', 'javascript', 'git', 'sdlc'],
    projectIds: ['load-management', 'dispatch-optimization'],
  },
];

export function getExperiencesByType(type: 'engineering' | 'management' | 'all'): Experience[] {
  if (type === 'all') return workHistory;
  return workHistory.filter(e => e.type === type);
}

export function getCurrentRole(): Experience | undefined {
  return workHistory.find(e => e.isCurrent);
}