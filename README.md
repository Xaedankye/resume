# Logan Stewart Resume

Dual-persona resume site showcasing software engineering and engineering leadership experience.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Markdown for blog posts

## Features

- **Dual Persona Toggle**: Switch between Engineering and Leadership views
- **Projects**: Deep-dive case studies with architecture diagrams
- **Work History**: Timeline of professional experience
- **Blog**: Markdown-based blog posts in `content/blog/`

## Development

```bash
npm run dev    # Start dev server at localhost:3000
npm run build # Build for production (static export)
```

## Content

- **Projects**: Edit `src/data/projects.ts`
- **Work History**: Edit `src/data/workHistory.ts`
- **Blog Posts**: Add markdown files to `content/blog/`

## Deployment

Configured for static export. Deploy the `out/` folder to any static host (Cloudflare Pages, Vercel, Netlify, etc.).

```bash
npm run build  # Output to out/ folder
```

## Domain

Deployed at [logan-stewart.com](https://logan-stewart.com)