# Resume Site - Agent Guidelines

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Identity

**Name**: Xaedan Resume Site
**Purpose**: Dual-persona resume showcasing both Software Engineer and E&T Manager roles
**Stack**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
**Location**: `/home/xaedan/code/personal/resume`

---

## Core Architecture

### Persona System
The site has two personas toggled via a top-right switch:
1. **Developer**: Mint green (#98FF98) on dark background (#0A0A0A)
2. **Manager**: Complementary light theme (warm white/cream)

### State Management
- React Context for persona state
- URL query param sync: `?persona=developer|manager`
- localStorage persistence

### Available Commands
```bash
npm run dev         # Start development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
```

---

## Key Principles

### Performance First (Big-O)
- **O(1) page loads**: Pre-rendered pages, no client-side waterfall
- **O(n) animations**: Use `LazyMotion` from Framer Motion to lazy-load only used animations
- **O(n) bundle size**: Target < 50KB initial JS (gzipped)
- **LCP < 1.5s | INP < 100ms | CLS < 0.05**

### React Server Components
- Default to Server Components (`async function`)
- Only add `'use client'` when interactivity is needed
- Keep client bundles minimal

### Code Standards
- **TypeScript**: Strict mode, explicit types required
- **Tailwind**: Use `@theme` in CSS variables for theme tokens
- **Framer Motion**: Use `LazyMotion` with `includeDomData`
- **Accessibility**: WCAG 2.1 AA compliance required

---

## Project Structure

```
src/
├── app/                    # Next.js App Router (Server-first)
│   ├── layout.tsx         # Root layout with PersonaProvider
│   ├── page.tsx           # Home (SSG)
│   ├── blog/              # Blog listing (ISR)
│   │   └── [slug]/        # Individual blog post
│   ├── projects/          # Projects (SSG)
│   │   └── [slug]/       # Individual project detail
│   ├── certifications/    # Certifications (SSG)
│   └── contact/          # Contact page
├── components/
│   ├── ui/               # Primitives: Button, Card, Badge, Tabs
│   ├── layout/           # Header, Footer, Container
│   ├── sections/         # Hero, Skills, Experience, Projects, Contact
│   └── navigation/       # PersonaToggle, MainNav
├── context/
│   └── PersonaContext.tsx # Persona state (client component)
├── lib/
│   ├── utils.ts          # cn() utility
│   └── theme.ts          # Theme tokens
├── data/
│   ├── projects.ts       # Project data (export Project[])
│   ├── certifications.ts # Certification data
│   ├── blog.ts           # Blog posts
│   └── socials.ts        # Social links
└── types/
    └── index.ts          # TypeScript interfaces
```

---

## Design System

### Color Tokens (CSS Variables)
Set in `src/app/globals.css`:

```css
:root {
  /* Developer (default) */
  --foreground: #98FF98;
  --background: #0A0A0A;
  --accent: #00CED1;
  --muted: #1A1A1A;
  
  /* Manager overrides */
  --manager-foreground: #1E293B;
  --manager-background: #FAF9F6;
  --manager-accent: #D97706;
}

/* Persona-aware colors (use these in components) */
[data-persona="developer"] {
  --color: var(--foreground);
  --bg: var(--background);
}

[data-persona="manager"] {
  --color: var(--manager-foreground);
  --bg: var(--manager-background);
}
```

### Animation Constraints
- Duration: 300-500ms for major transitions
- Always use `viewport={{ once: true }}` for scroll animations
- Use spring physics for natural feel: `{ stiffness: 300, damping: 30 }`

---

## Development Workflow

### Adding a New Section
1. Create component in `src/components/sections/`
2. Use React Server Components when possible
3. Add client interactivity only in child components with `'use client'`
4. Follow animation guidelines

### Adding a New Project
1. Add to `src/data/projects.ts`
2. Image goes in `public/projects/`
3. Code snippet uses `prism-react-renderer` for syntax highlighting

### Adding a Blog Post
1. Add to `src/data/blog.ts`
2. Support for MDX in future

---

## Common Tasks

### Update Persona Colors
Edit `src/app/globals.css` CSS variables, then update related components in `src/components/persona/`.

### Add New Social Link
Edit `src/data/socials.ts` - automatically renders in Footer.

### Change Navigation Tabs
Edit `src/components/navigation/MainNav.tsx`.

---

## Testing Requirements

Before any PR:
1. `npm run build` - must succeed
2. `npm run lint` - no errors
3. Lighthouse: 95+ performance
4. All links working
5. Mobile responsive (320px+)

---

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Framer Motion LazyMotion](https://www.framer.com/motion/#lazy-motion)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Design Document](./docs/DESIGN.md)