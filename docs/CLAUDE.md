# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 documentation site for Potter Labs AI services, built with TypeScript, shadcn/ui components, and Tailwind CSS. The site uses static export for deployment on Netlify and Vercel.

## Development Commands

```bash
# Development
bun run dev            # Start development server (with turbopack)
bun install           # Install dependencies

# Build & Production
bun run build         # Build for production (static export)
bun run start         # Start production server

# Code Quality
bun run lint          # Run TypeScript check + Next.js linting
bun run format        # Format code with Biome

# Package Manager
# Use Bun for all operations (not npm/yarn)
```

## Architecture & Structure

### Core Layout System
- **Root Layout**: `src/app/layout.tsx` - Sets up metadata and font loading
- **Client Body**: `src/app/ClientBody.tsx` - Handles client-side hydration and classes
- **Docs Layout**: `src/components/docs-layout.tsx` - Main layout with sidebar navigation, dark/light theme toggle, and collapsible sections

### Navigation & Routing
- Uses Next.js App Router with file-based routing in `src/app/guide/`
- Hierarchical documentation structure: `/guide/[category]/[page]`
- Collapsible sidebar navigation with state management for:
  - ai-character (3 items)
  - ai-story (8 items) 
  - trendit (8 items)

### Component Architecture
- **UI Components**: Located in `src/components/ui/` (shadcn/ui components)
- **Breadcrumb Navigation**: Used consistently across all guide pages
- **Card-based Layout**: Guide pages use shadcn Card components for content organization
- **Responsive Design**: Mobile-first with collapsible sidebar and overlay

### Styling System
- **Tailwind CSS**: Primary styling framework
- **Dark Mode**: Implemented with class-based dark mode toggle
- **Component Library**: shadcn/ui components (Button, Card, Collapsible, etc.)
- **Icons**: Lucide React icons throughout

### Static Export Configuration
- Next.js configured for static export (`output: 'export'`)
- Output directory: `out/`
- Trailing slashes enabled for proper static hosting
- Image optimization disabled for static deployment

### Code Quality Tools
- **Biome**: Primary linter and formatter (replaces ESLint/Prettier)
- **TypeScript**: Strict typing enabled
- **Accessibility**: Many a11y rules disabled in biome.json (consider re-enabling)

## Key Patterns

### Page Structure
All guide pages follow this pattern:
1. DocsLayout wrapper
2. Breadcrumb navigation 
3. Header section (title + description)
4. Content section (cards/prose)
5. Navigation footer (prev/next links)

### Navigation State
The sidebar uses local state to manage:
- `sidebarOpen` - Mobile sidebar visibility
- `guideExpanded` - Main guide section
- Category-specific expanded states (`aiCharacterExpanded`, etc.)

### Content Organization
- **Overview Pages**: Category introductions with feature cards
- **Guide Pages**: Step-by-step API documentation
- **Hierarchical URLs**: `/guide/category/specific-endpoint`

## Adding New Documentation

1. Create page file: `src/app/guide/[category]/[page]/page.tsx`
2. Update sidebar navigation in `src/components/docs-layout.tsx`
3. Add navigation links in parent category overview page
4. Follow existing breadcrumb and navigation patterns

## Deployment Notes

- Site configured for both Netlify and Vercel
- Uses static export, so no server-side features
- Build artifacts go to `out/` directory
- Supports auto-deployment from git pushes