# Resume Site Design Document

## Project Overview

A high-performance, dual-persona resume website showcasing both technical development skills and management expertise. The site features a persona toggle system that transforms the entire visual identity between "Expert Software Engineer" and "Senior E&T Manager" modes.

## Table of Contents

1. [Core Requirements](#core-requirements)
2. [Persona System](#persona-system)
3. [Technical Architecture](#technical-architecture)
4. [Performance Targets](#performance-targets)
5. [UI/UX Design](#uiux-design)
6. [Animation Guidelines](#animation-guidelines)
7. [Content Structure](#content-structure)
8. [Component Library](#component-library)
9. [Data Models](#data-models)

---

## Core Requirements

### Dual-Persona Toggle
- Top-right toggle switch to swap between personas
- Smooth theme transition (300ms ease-out)
- Persisted in URL query param `?persona=developer|manager` for shareability
- Persisted in localStorage for preference

### Theme Systems

#### Developer Persona (Default)
- **Foreground**: Mint Green (#98FF98 or custom panda "mint green")
- **Background**: Dark (almost black) - `#0A0A0A` or `#0D0D0D`
- **Accent**: Cyan/Teal highlights
- **Aesthetic**: Technical, precise, modern IDE-like

#### Manager Persona (Light Profile)
- **Foreground**: Deep slate/navy or complementary to mint
- **Background**: Light cream/warm white - `#FAF9F6`
- **Accent**: Warm gold or complementary amber
- **Aesthetic**: Professional, approachable, corporate-friendly

### Navigation
- Tab-style navigation for inner pages
- Main nav: Home, Projects, Certifications, Blog, Contact
- Each section has sub-tabs for specific content types

---

## Technical Architecture

### Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── blog/              # Blog section
│   ├── projects/           # Projects showcase
│   ├── certifications/     # Certifications
│   └── contact/           # Contact page
├── components/
│   ├── ui/               # Reusable UI primitives
│   ├── layout/            # Layout components (Header, Footer)
│   ├── persona/          # Persona-specific components
│   │   ├── developer/    # Developer persona themes
│   │   └── manager/      # Manager persona themes
│   ├── sections/          # Page sections
│   └── navigation/       # Navigation components
├── context/
│   └── PersonaContext.tsx  # Persona state management
├── lib/
│   ├── utils.ts          # Utility functions
│   └── theme.ts          # Theme configuration
├── hooks/
│   └── usePersona.ts     # Persona hook
├── data/
│   ├── projects.ts       # Project data
│   ├── certifications.ts # Certification data
│   ├── blog.ts          # Blog posts
│   └── socials.ts        # Social links
└── types/
    └── index.ts          # TypeScript types
```

### Rendering Strategy
- **Home Page**: Static (SSG) with client-side interactivity
- **Blog**: ISR with 60-second revalidation
- **Projects**: Static generation with dynamic routes
- **Persona Toggle**: Client component with context

---

## Performance Targets

### Core Web Vitals
| Metric | Target | Max Acceptable |
|--------|--------|----------------|
| LCP | < 1.5s | 2.5s |
| INP | < 100ms | 200ms |
| CLS | < 0.05 | 0.1 |

### Optimization Strategies
1. **React Server Components**: Default - minimize client bundles
2. **Lazy Motion**: Use `LazyMotion` from Framer Motion for animations
3. **Image Optimization**: Next.js Image with AVIF/WebP
4. **Font Optimization**: `next/font` with variable fonts
5. **Code Splitting**: Automatic route-based splitting
6. **Prefetching**: Next.js Link prefetch on hover

### Bundle Budget
- Initial JS: < 50KB (gzipped)
- Lighthouse Performance: 95+

---

## UI/UX Design

### Layout Principles
- **F-Pattern Reading**: Important info in top-left scan path
- **Generous Whitespace**: Minimum 24px between sections
- **Responsive**: Mobile-first, 320px to 1920px+
- **Bento Grid**: Card-based sections for project showcase

### Typography
- **Headings**: Bold, expressive - potential for gradient text
- **Body**: 16px minimum, 1.6 line-height
- **Code**: Monospace for technical sections

### Color System (CSS Variables)

```css
:root {
  /* Developer Persona (Dark) */
  --foreground: #98FF98;
  --background: #0A0A0A;
  --accent: #00CED1;
  --muted: #2D2D2D;
  
  /* Overrides for Manager Persona */
  --manager-foreground: #1E293B;
  --manager-background: #FAF9F6;
  --manager-accent: #D97706;
}
```

### Component Patterns

#### Bento Grid Cards
- Variable sizes (small, medium, large)
- Hover lift effect (translateY -4px)
- Subtle glow on developer persona
- Consistent border-radius: 16px

#### Tab Navigation
- Horizontal tabs with active indicator
- Animated underline on active
- Keyboard accessible

---

## Animation Guidelines

### Core Principles
1. **Subtle, Not Distracting**: Animations enhance, don't distract
2. **Duration**: 300-500ms for major transitions
3. **Easing**: Spring animations feel more natural than linear
4. **Performance First**: Use `will-change` sparingly, avoid layout thrashing

### Animation Patterns

#### Hero Section
- Staggered text reveal on load
- Fade-in + slide-up (300ms each, 100ms stagger)

#### Persona Toggle
- Smooth color transitions (300ms)
- Content crossfade with scale

#### Scroll Animations
- `whileInView` with `viewport={{ once: true }}`
- Fade-up for sections (300ms)
- Stagger children for lists (50ms delay)

#### Micro-interactions
- Button hover: scale(1.02) + glow
- Card hover: translateY(-4px) + shadow increase
- Link hover: underline animate in

### Framer Motion Configuration

```typescript
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};
```

---

## Content Structure

### Home Page Sections
1. **Hero**: Name, title, tagline, persona toggle
2. **Skills**: Technical/management skills by persona
3. **Experience**: Timeline of work history
4. **Featured Projects**: Bento grid showcase
5. **Call to Action**: Contact prompt

### Projects Tab
- Project cards with:
  - Title, description, tech stack
  - Links to live/demo
  - Code snippets (expandable)
  - Metrics/impact

### Certifications Tab
- Certificate cards
- Issue date, expiration
- Verification link
- Skills demonstrated

### Blog Tab
- Article list with excerpts
- Categories: Technical, Management, Thoughts
- Search and filter
- Reading time estimates

### Contact Section
- All social links:
  - LinkedIn
  - Facebook
  - Email (mailto:)
  - Phone
- Contact form (client-side only, no backend)

---

## Component Library

### UI Primitives (src/components/ui/)
| Component | Purpose |
|-----------|---------|
| `Button` | Primary CTA with variants |
| `Card` | Bento grid cards |
| `Tabs` | Tab navigation |
| `Badge` | Skill/category badges |
| `Avatar` | Profile image |
| `Link` | Styled anchor links |
| `Toggle` | Persona switch |
| `Skeleton` | Loading states |

### Layout Components (src/components/layout/)
| Component | Purpose |
|-----------|---------|
| `Header` | Top navigation with persona toggle |
| `Footer` | Social links, copyright |
| `NavBar` | Mobile navigation |
| `Container` | Max-width wrapper |

### Section Components (src/components/sections/)
| Component | Purpose |
|-----------|---------|
| `Hero` | Hero section with animations |
| `SkillsGrid` | Skills showcase |
| `ExperienceTimeline` | Work history |
| `ProjectGrid` | Projects bento grid |
| `ContactSection` | Contact information |

---

## Data Models

### Project Interface

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
  links: { label: string; url: string }[];
  featured: boolean;
  codeSnippet?: {
    language: string;
    code: string;
  };
}
```

### Certification Interface

```typescript
interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expirationDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
}
```

### Blog Post Interface

```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: 'technical' | 'management' | 'thoughts';
  readingTime: number;
  tags: string[];
}
```

---

## Research Notes

### Inspiration Sources
1. **Framer Gallery** - Best animated websites for creative inspiration
2. **Awwwards** - Award-winning portfolio designs
3. **Daniel Miessler** - Blog format for technical articles
4. **Frontend Portfolio Examples** - Type-safe, performant implementations

### Best Practices Applied
- Mobile-first design (60%+ recruiters view on mobile)
- 2-second load time target
- F-pattern reading layout
- Clean, minimalist aesthetic
- Performance metrics in portfolio projects

### Key Design Decisions
1. **No CMS**: Static TypeScript data files for simplicity
2. **No Backend**: Contact form via mailto or client-side form service
3. **Server Components First**: Minimize client-side JavaScript
4. **CSS Variables**: Enable smooth theme transitions
5. **URL Sync**: Shareable persona state

---

## Future Enhancements

### Phase 2 Ideas
- [ ] Blog with MDX support
- [ ] Project live demos
- [ ] Analytics integration
- [ ] Sitemap and SEO optimization
- [ ]OG images for social sharing
- [ ] Dark mode toggle for light persona

### Technical Debt
- [ ] Add comprehensive tests
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Lighthouse CI in deployment
- [ ] Performance monitoring

---

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Core Web Vitals](https://web.dev/vitals/)
- [WebAIM Accessibility](https://webaim.org/)