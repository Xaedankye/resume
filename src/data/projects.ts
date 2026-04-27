import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'event-driven-oms',
    title: 'Event Driven Order Management System',
    description: 'Enterprise-scale order management system with real-time order submission, 3PL integration, tracking, and multi-tenant customer facing portal.',
    shortDescription: 'Enterprise OMS with 3PL integration and real-time tracking',
    techStack: ['NextJS', 'NodeJS', 'Python', 'AWS', 'Terraform', 'PostgreSQL', 'Gitlab CI/CD'],
    tagIds: ['nextjs', 'nodejs', 'python', 'aws'],
    metrics: [
      { label: 'Tracking Events Processed Daily', value: '10K+' },
      { label: 'System Uptime', value: '99.95%' },
      { label: 'Tracking Turnaround', value: '< 1 hour' },
    ],
    featured: true,
    persona: 'engineering',
    
    // Deep dive content
    overview: `Led the architecture and development of a fully operational Event Driven Order Management System (OMS) that handles the complete lifecycle of orders from submission to delivery. This system serves as the backbone for multiple e-commerce platforms, processing over 50,000 orders daily with high reliability.`,
    
    problem: `The previous monolithic order management system struggled with:
- Scalability issues during peak traffic periods
- Tight coupling between order processing and fulfillment
- Limited visibility into order status across the pipeline
- No support for multiple tenants. Everyone followed the same process.
- Manual intervention required for 3PL coordination and tracking collection

Because we had a small team, we had to migrate pieces of this at a time and backwards compatibility was a high priority that resulted in a lot of refactoring and code churn. One of the biggest challenges of this project was mitigating that code churn and trying to design slim, but with as much oppurtunity for growth as possible`,
    
    solution: `Designed and implemented a distributed, event-driven architecture using AWS FIFO queues as the event backbone. The system decouples services through event sourcing, enabling independent scaling and resilience.`,
    
    architecture: {
      description: 'The system follows an event-driven microservices architecture pattern with AWS FIFO queues as the central event backbone.',
      components: [
        { name: 'Order API Gateway', description: 'RESTful API handling order submission, validation, and tenant routing', type: 'service', technologies: ['Python', 'FastAPI', 'Terraform', 'AWS ECS'] },
        { name: 'Order Service', description: 'Core order lifecycle management and state machine', type: 'service', technologies: ['Python', 'AWS DynamoDB', 'Terraform', 'PostgreSQL'] },
        { name: '3PL Integration Service', description: 'Third-party logistics provider coordination', type: 'service', technologies: ['Python', 'FastAPI'] },
        { name: 'Tracking Service', description: 'Webhook for Real-time shipment tracking and notifications', type: 'service', technologies: ['Python', 'AWS Gateway', 'Terraform'] },
        { name: 'Order Database', description: 'Primary order data store', type: 'database', technologies: ['PostgreSQL', 'AWS RDS', 'DynamoDB'] },
        { name: 'Customer Portal', description: 'Multi-tenant customer-facing application', type: 'service', technologies: ['NextJS', 'AWS ECS', 'Terraform'] },
      ],
      flowDescription: `Order Flow: Customer submits order → API Gateway validates → Order Service creates order event → Order Service Pushes to Appropriate 3rd Party → 3PL Integration picks up → Tracking Service monitors → Customer Views latest tracking updates via Portal`,
    },
    
    lessonsLearned: [
      'Event-driven architectures require careful consideration of event ordering and idempotency',
      'Distributed tracing is essential for debugging in microservices environments',
      'Schema evolution must be planned from the start using something like Avro or Protobuf',
      'Circuit breakers are critical for handling 3PL provider failures gracefully',
    ],
    
    teamContribution: `As Technical Lead, I:
- Architected the overall system design and technology stack
- Led a team of 5 engineers building the entirety of the system 
- Established coding standards and code review processes
- Implemented CI/CD pipelines with automated testing
- Conducted architecture reviews and mentored junior developers`,
  },
{
    id: 'unified-tracking-integration-engine',
    title: 'Unified Tracking & Integration Engine',
    description: 'A high-performance real-time tracking system that synchronizes data across multiple 3PL/4PL partners and internal platforms like NetSuite and HubSpot.',
    shortDescription: 'Real-time logistics tracking and cross-platform data synchronization engine',
    techStack: ['Python', 'AWS ECS', 'SQS', 'EventBridge', 'DynamoDB', 'Aurora', 'Datadog'],
    tagIds: ['python', 'aws', 'event-driven', 'logistics'],
    metrics: [
      { label: 'System Uptime during Migration', value: '100%' },
      { label: 'Integration Partners', value: 'Multiple 3PL/4PL' },
      { label: 'Data Accuracy', value: 'Real-time' },
    ],
    featured: true,
    persona: 'engineering',
    
    // Deep dive content
    overview: `Designed and led the implementation of a real-time tracking system that serves as the central nervous system for logistics data. The engine captures updates from various third-party fulfillment partners and cascades those changes to internal applications, databases, and business tools like NetSuite and HubSpot.`,
    
    problem: `The organization relied on a fragmented, legacy Transport Management System (TMS) that lacked real-time visibility. Data was siloed, and manual effort was required to synchronize tracking updates across internal platforms, leading to potential delays and communication gaps between 3PL partners and internal stakeholders.`,
    
    solution: `Spearheaded the migration to a modern, event-driven architecture. By leveraging AWS EventBridge and SQS as a messaging backbone, I created a decoupled system where tracking events trigger automated updates across the entire ecosystem—ensuring consistency between the warehouse and customer-facing tools.`,
    
    architecture: {
      description: 'An event-driven microservices architecture built on AWS to handle high-concurrency tracking events with high availability and durability.',
      components: [
        { name: 'Ingestion Service', description: 'Receives webhooks and API updates from 3PL/4PL partners', type: 'service', technologies: ['Python', 'AWS ECS'] },
        { name: 'Event Backbone', description: 'Orchestrates event routing and delivery to downstream consumers', type: 'messaging', technologies: ['AWS EventBridge', 'SQS'] },
        { name: 'State Store', description: 'Maintains real-time shipment status and history', type: 'database', technologies: ['DynamoDB', 'Aurora'] },
        { name: 'Integration Layer', description: 'Syncs data to legacy and business platforms', type: 'service', technologies: ['NetSuite API', 'HubSpot', 'QuickBooks', 'Asana'] },
        { name: 'Observability', description: 'Full-stack monitoring and alerting for tracking pipelines', type: 'tooling', technologies: ['Datadog'] },
      ],
      flowDescription: `3PL Update → Ingestion Service → EventBridge → SQS Queues → Integration Layer (NetSuite/HubSpot) & Internal Databases updated simultaneously.`,
    },
    
    lessonsLearned: [
      'Maintaining 100% uptime during a legacy TMS migration requires robust circuit breaking and parallel processing',
      'Standardizing disparate 3PL data formats early is critical for scalable SLA monitoring',
      'Event-driven patterns significantly reduce the load on primary transactional databases during high-volume tracking updates',
    ],
    
    teamContribution: `As Senior Software Architect, I:
- Designed the core event-driven architecture and oversaw the implementation
- Established and managed technical relationships with all 3PL and 4PL fulfillment partners
- Developed SLA KPIs to measure partner performance via real-time data
- Ensured a seamless transition from the legacy TMS with zero downtime`,
  },
{
    id: 'shipper-360',
    title: 'Shipper 360',
    description: 'A comprehensive, external-facing TMS platform allowing customers to manage the full freight lifecycle—from pricing and quoting to real-time intermodal tracking.',
    shortDescription: 'Enterprise-grade customer-facing TMS for freight and logistics management',
    techStack: ['Angular', 'Java', 'Spring Boot', 'Azure', 'Kubernetes', 'Grafana'],
    tagIds: ['angular', 'java', 'azure', 'kubernetes', 'logistics'],
    metrics: [
      { label: 'Engineering Velocity Increase', value: '25%' },
      { label: 'Operational Efficiency Improvement', value: '30%' },
      { label: 'Deployment Availability', value: 'Blue/Green' },
    ],
    links: [
      { label: 'Public Platform', url: 'https://www.jbhunt.com/technology/shipper-360' },
    ],
    featured: true,
    persona: 'leadership',
    
    // Deep dive content
    overview: `Managed the development and architectural evolution of Shipper 360, a mission-critical platform for J.B. Hunt’s external customers. Leading a team of 40+ developers, I oversaw the creation of a system capable of handling specialized freight needs, complex pricing models, and "white glove" delivery options for major enterprise clients like Whirlpool.`,
    
    problem: `Customers needed a single, high-performance viewport to manage highly varied logistics needs—ranging from standard truckload to complex intermodal rail schedules and DOT-compliant specialized freight. The challenge was maintaining high availability and sub-second performance for a massive user base while frequently shipping complex feature updates.`,
    
    solution: `Implemented a robust, hybrid-cloud architecture utilizing Kubernetes for container orchestration and advanced deployment strategies like Blue/Green and Canary rollouts. This allowed for continuous delivery without disrupting the customer experience, supported by comprehensive Grafana monitoring to ensure system health.`,
    
    architecture: {
      description: 'A distributed enterprise architecture leveraging Java backends and Angular frontends, integrated via event-driven services for real-time order status and compliance tracking.',
      components: [
        { name: 'Customer Interface', description: 'Highly responsive web platform for order management and quoting', type: 'frontend', technologies: ['Angular', 'TypeScript'] },
        { name: 'TMS Core Services', description: 'Business logic for pricing, scheduling, and specialized handling', type: 'service', technologies: ['Java', 'Spring Boot'] },
        { name: 'Orchestration Layer', description: 'Manages containerized deployments and scaling', type: 'infrastructure', technologies: ['Azure', 'Kubernetes (AKS)'] },
        { name: 'Tracking & Event Bus', description: 'Real-time updates for order status and rail schedules', type: 'messaging', technologies: ['Java', 'Event-Driven Patterns'] },
        { name: 'Observability Suite', description: 'Monitoring, alerting, and performance metrics', type: 'tooling', technologies: ['Grafana', 'Azure Monitor'] },
      ],
      flowDescription: `Customer Quote Request → Pricing Engine → Order Submission Event → Fulfillment Tracking → Real-time Customer Viewport Status.`,
    },
    
    lessonsLearned: [
      'Canary rollouts and Blue/Green deployments are non-negotiable for high-traffic, external-facing applications to mitigate risk',
      'Managing specialized logistics like Intermodal or White Glove requires deep domain integration within the technical architecture',
      'Organizational connectivity is as important as system connectivity; leading E&T architecture requires constant cross-departmental alignment',
    ],
    
    teamContribution: `As Manager II, I:
- Directed two managers and ~40 developers in an Agile transformation that increased velocity by 25% 
- Championed the technical roadmap for "white glove" in-home delivery features for DCS customers
- Led the E&T organization in defining standards for architecture and system connectability 
- Achieved significant operational efficiency gains through process optimization and resource management `,
  },
{
    id: 'enterprise-modernization-agile-transformation',
    title: 'Enterprise Modernization & Agile Transformation',
    description: 'Led the strategic migration of core logistics systems from COBOL/Mainframe environments to a modern, event-driven microservices architecture.',
    shortDescription: 'Mainframe to Kubernetes modernization and Agile organizational transformation',
    techStack: ['Java', 'Spring Boot', 'Azure DevOps', 'Kubernetes', 'COBOL', 'Mainframe'],
    tagIds: ['modernization', 'agile', 'devops', 'kubernetes', 'leadership'],
    metrics: [
      { label: 'Deployment Frequency', value: 'Quarterly to Daily' },
      { label: 'Team Velocity Increase', value: '25%' },
      { label: 'Delivery Time Reduction', value: '15%' },
    ],
    featured: true,
    persona: 'leadership',
    
    // Deep dive content
    overview: `Spearheaded a multi-year modernization initiative at J.B. Hunt, transitioning critical business logic out of COBOL and mainframe implementations into a cloud-native ecosystem. This project wasn't just a technical refactor; it was a complete overhaul of how the engineering organization delivered value, moving from rigid quarterly cycles to a high-velocity, daily-deployment model.`,
    
    problem: `The reliance on legacy mainframe systems created significant bottlenecks, including quarterly deployment constraints and a high barrier to entry for new engineers. The "top of the funnel" efforts across multiple products were often desynchronized, leading to integration failures and slow reactions to market demands.`,
    
    solution: `Architected an event-driven transition strategy that allowed for phased migration to Kubernetes-based microservices. I institutionalized Agile frameworks, introducing "Big Room Planning" to synchronize cross-product efforts and leveraging Azure DevOps to automate the SDLC, enabling the shift toward continuous integration and delivery.`,
    
    architecture: {
      description: 'A phased strangler-pattern migration from mainframe monoliths to event-driven Spring Boot services deployed on Kubernetes.',
      components: [
        { name: 'Legacy Core', description: 'Original COBOL/Mainframe business logic being systematically decomposed', type: 'legacy', technologies: ['COBOL', 'Mainframe'] },
        { name: 'Modern Service Layer', description: 'Event-driven microservices replacing legacy functions', type: 'service', technologies: ['Java', 'Spring Boot'] },
        { name: 'CI/CD Pipeline', description: 'Automated build and deployment orchestration', type: 'infrastructure', technologies: ['Azure DevOps', 'Kubernetes'] },
        { name: 'Coordination Framework', description: 'Cross-team planning and synchronization model', type: 'process', technologies: ['Big Room Planning', 'Agile/Scrum'] },
      ],
      flowDescription: `Legacy System Decomposition → Event-Driven Service Implementation → Automated Testing & CI/CD → Daily Production Deployment.`,
    },
    
    lessonsLearned: [
      'Modernization is as much about culture as it is about code; shifting a team from a quarterly mindset to a daily one requires heavy investment in CI/CD trust',
      'Big Room Planning is essential for managing dependencies in a microservices environment where multiple products must land features simultaneously',
      'A phased, event-driven approach to decommissioning mainframes minimizes risk compared to a "big bang" migration',
    ],
    
    teamContribution: `As Manager, I:
- Directed the transition of multiple Agile teams from legacy frameworks to modern, scalable frameworks
- Instituted best practices for sprint planning, retrospectives, and backlog grooming across the department
- Coordinated "top of the funnel" engineering efforts to ensure cross-product alignment for major releases
- Mentored senior and junior developers through the technical shift from mainframe thinking to cloud-native architecture`,
  },
{
    id: 'fleet-visualization-exception-dashboard',
    title: 'Fleet-Wide Visualization & Exception Dashboard',
    description: 'A high-performance geospatial dashboard providing real-time truck tracking, dynamic ETA calculation, and automated exception handling for fleet managers.',
    shortDescription: 'Real-time geospatial tracking and automated exception management system',
    techStack: ['Angular', 'RxJS', 'Java', 'Spring Boot', 'Google Maps API', 'PostGIS'],
    tagIds: ['angular', 'geospatial', 'real-time', 'fleet-management'],
    metrics: [
      { label: 'Tracking Accuracy', value: 'Precise GPS' },
      { label: 'Manual Intervention Reduction', value: 'Significant' },
      { label: 'Data Processing', value: 'Real-time' },
    ],
    featured: true,
    persona: 'engineering',
    
    // Deep dive content
    overview: `Developed a comprehensive tracking and visualization platform that provided both external customers and internal fleet managers with a "live" view of logistics operations. The system integrated GPS telemetry to render trucks on a map with precise ETAs and predicted routing, serving as the primary tool for proactive shipment management.`,
    
    problem: `Stakeholders lacked a centralized, real-time visual interface for fleet operations. Identifying shipments at risk of missing their windows required manual cross-referencing of reports, leading to delayed interventions. Furthermore, internal users managing thousands of assets needed a way to visualize entire fleets without overwhelming the browser’s rendering capabilities.`,
    
    solution: `Built a sophisticated Angular application utilizing RxJS for managing high-frequency telemetry streams. I implemented dynamic marker clustering to optimize frontend performance for large-scale fleet views and engineered an exception engine that evaluated real-time ETAs against dynamic business rules. This allowed the system to automatically flag discrepancies, enabling managers to focus only on shipments requiring immediate attention.`,
    
    architecture: {
      description: 'A geospatial-focused microservices architecture designed to process and visualize high-velocity telemetry data.',
      components: [
        { name: 'Visualization Engine', description: 'Interactive map interface with custom clustering logic', type: 'frontend', technologies: ['Angular', 'Google Maps SDK'] },
        { name: 'Telemetry Processor', description: 'Handles real-time GPS ingest and route prediction', type: 'service', technologies: ['Java', 'Spring Boot'] },
        { name: 'Geospatial Database', description: 'Stores and queries spatial coordinates and routes', type: 'database', technologies: ['PostgreSQL', 'PostGIS'] },
        { name: 'Exception Engine', description: 'Evaluates ETA health against BU-specific business rules', type: 'service', technologies: ['Java', 'Spring Boot'] },
      ],
      flowDescription: `GPS Telemetry Ingest → Route/ETA Prediction → Exception Engine Validation → Real-time Map Update via RxJS Stream.`,
    },
    
    lessonsLearned: [
      'Efficient geospatial indexing is critical for maintaining performance when querying live routes across thousands of active assets',
      'Client-side performance in tracking applications depends heavily on smart DOM management and marker clustering techniques',
      'Dynamic thresholding for exceptions allows different business units to manage "health" based on their specific operational tolerances',
    ],
    
    teamContribution: `As Senior Software Engineer, I:
- Designed and implemented the front-end and back-end features for the fleet visualization platform 
- Optimized application performance by resolving critical bottlenecks related to real-time data rendering 
- Built a multi-tenant exception dashboard that reduced manual monitoring overhead
- Collaborated with QA to establish reliable deployment pipelines for these high-visibility features `
  }
];

export function getProjectsByPersona(persona: 'engineering' | 'management' | 'both'): Project[] {
  return projects.filter(p => p.persona === persona || p.persona === 'both');
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}
