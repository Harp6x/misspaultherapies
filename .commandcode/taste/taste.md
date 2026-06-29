# Stack
- Always use Next.js App Router (never Pages Router), latest version, with TypeScript. Confidence: 0.99
- Always use Tailwind CSS v4 for styling, never CSS modules, styled-components, or Sass. Confidence: 0.99
- Use Framer Motion for animations with motion.div initial/animate/transition pattern. Confidence: 0.95
- Use Sanity as headless CMS with embedded Studio at /studio route and GROQ queries. Confidence: 0.97
- Use Lucide React for UI icons and react-icons/si for brand icons like Instagram, YouTube, Substack. Confidence: 0.95
- Deploy on Vercel with auto-deploy from GitHub main branch. Confidence: 0.99
- Always include @vercel/analytics and @vercel/speed-insights in every project. Confidence: 0.95
- Use npm as package manager, never yarn or pnpm. Confidence: 0.90
- Use Git with SSH auth, GitHub org Harp6x, conventional commits (feat:, fix:, chore:). Confidence: 0.95

# Project Structure
- Use src/app/ for routes, src/components/ for components, src/data/ for static fallback data and TypeScript types. Confidence: 0.97
- Keep CMS layer in src/sanity/ with client.ts, queries.ts, and schemas/ directory. Confidence: 0.97
- Put utility functions in src/lib/ with one file per concern like cms.ts, youtube.ts, instagram.ts. Confidence: 0.95
- Never use utils/ folder, barrel exports, or index.ts re-export files. Confidence: 0.90
- TypeScript interfaces go in src/data/types.ts as single source of truth for all data shapes. Confidence: 0.95

# Components
- One component per file, file name matches the default export exactly in PascalCase. Confidence: 0.99
- Define props via a named Props interface, never inline types. Confidence: 0.95
- Use "use client" directive only when interactivity is needed like scroll listeners, useState, or animations. Confidence: 0.97
- Default to server components and fetch data in page-level server components then pass as props. Confidence: 0.95
- Use variant pattern with variant: "professional" | "personal" for dual-mode site components. Confidence: 0.95
- Use named function declarations for components and arrow functions for inline handlers. Confidence: 0.93
- Destructure props in function signature like function Hero({ variant, profile }: Props). Confidence: 0.95

# Data Fetching
- CMS-first with static fallbacks: every fetchX() tries Sanity first then falls back to src/data/ files. Confidence: 0.97
- GROQ queries return typed interfaces and dereference assets inline with image.asset->url. Confidence: 0.95
- Cache data-driven pages indefinitely and revalidate only through the Sanity publish webhook or a new deployment; never add numeric `revalidate` timers. Confidence: 1.00
- Fetch singleton documents with *[_type == "profile"][0] pattern in GROQ. Confidence: 0.95
- Use order field plus | order(order asc) in GROQ for ordered collections. Confidence: 0.93

# Styling
- Define colors via CSS custom properties like --text-primary, --bg-card, --accent in globals.css. Confidence: 0.97
- Primary brand accent color is #d97706 amber, used sparingly for CTAs and accents. Confidence: 0.95
- Personal/creative pages use earthy warm tones with --personal-accent: #c2703a. Confidence: 0.95
- Support dark mode via CSS variable swaps in globals.css, not Tailwind dark: prefix. Confidence: 0.93
- Use font-mono for labels and metadata, default sans for body, font-serif-heading for personal headings. Confidence: 0.93
- Mobile-first responsive design with primary breakpoints at md: 768px and lg: 1024px. Confidence: 0.95
- Hover transitions use transition-all duration-300 or transition-colors duration-300. Confidence: 0.93

# Animations
- Entrance animations use fade up pattern with opacity 0 y 20 to opacity 1 y 0. Confidence: 0.95
- Stagger hero element delays sequentially at 1.2s, 1.3s, 1.5s, 1.7s intervals. Confidence: 0.93
- Use AnimatedSection wrapper component for scroll-triggered reveals. Confidence: 0.93
- Keep animations subtle and purposeful, no heavy or decorative motion. Confidence: 0.95

# Sanity CMS
- Schemas use defineType and defineField from sanity package. Confidence: 0.97
- File uploads use type file with options accept application/pdf for documents. Confidence: 0.95
- Image uploads use type image with hotspot true. Confidence: 0.93
- Always add preview configuration on every schema. Confidence: 0.90
- Schema type names use camelCase like blogPost, beyondWork, lifePillar. Confidence: 0.95

# Code Style
- Use semicolons consistently in all TypeScript and TSX files. Confidence: 0.95
- Use double quotes for JSX attributes and imports. Confidence: 0.95
- Use && for conditional show/hide rendering and ternary for A/B variant rendering. Confidence: 0.95
- Prefer early return over else blocks. Confidence: 0.93
- Use template literals over string concatenation. Confidence: 0.95
- In className strings put static classes first then conditional classes with template literals. Confidence: 0.93
- No any type unless absolutely necessary. Confidence: 0.90
- No console.log left in production code. Confidence: 0.93
- No inline styles unless for writingMode or dynamic values Tailwind cannot handle. Confidence: 0.90

# SEO
- Use Next.js export const metadata object for page metadata. Confidence: 0.95
- Always include title, description, Open Graph, and Twitter card metadata. Confidence: 0.95
- Generate sitemap.xml for all routes. Confidence: 0.93
- Use JSON-LD structured data where applicable. Confidence: 0.90
- Optimize images via Next.js Image component with remotePatterns in next.config.ts. Confidence: 0.95

# Design Philosophy
- Minimal purposeful UI where white space is a feature not waste. Confidence: 0.95
- Dark mode is first-class, both themes must look intentional. Confidence: 0.93
- Use grid or topo backgrounds for texture, not decoration. Confidence: 0.90
- Typography-driven design, let the text breathe. Confidence: 0.93
- All interactive elements must have clear hover and focus states. Confidence: 0.95
- Mobile-first approach but desktop is the primary experience for portfolio sites. Confidence: 0.93

# Avoidances
- Never use CSS-in-JS like styled-components or Emotion. Confidence: 0.95
- Never use Redux or Zustand, prefer React Context when global state is needed. Confidence: 0.90
- Never use GraphQL, GROQ or REST covers all use cases. Confidence: 0.90
- Never use class components in React. Confidence: 0.99
- Never create excessive abstraction, prefer readable flat component code over deep nesting. Confidence: 0.93
