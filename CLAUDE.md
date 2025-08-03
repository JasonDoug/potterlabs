# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo containing two main projects for Potter Labs AI services:

1. **docs/** - Next.js 15 documentation site with TypeScript, shadcn/ui, and Tailwind CSS
2. **v0/** - Node.js Express API backend for AI story/video generation services

## Development Commands

### Documentation Site (docs/)
```bash
cd docs
bun install           # Install dependencies
bun run dev          # Start development server (with turbopack)
bun run build        # Build for production (static export)
bun run start        # Start production server
bun run lint         # Run TypeScript check + Next.js linting
bun run format       # Format code with Biome
```

### API Backend (v0/)
```bash
cd v0/api
npm install          # Install dependencies
npm run dev          # Start API server with nodemon
npm start            # Start production API server

# For Python AI logic service
cd v0/ai-logic
pip install -r requirements.txt
python main.py

# Docker deployment
cd v0
docker-compose up    # Start full stack with Swagger UI
```

### CLI Tools
```bash
cd v0/cli
node create-ai-video.mjs    # Interactive video config generator
```

## Project Architecture

### Documentation Site (docs/)
- **Framework**: Next.js 15 with App Router and static export
- **UI Library**: shadcn/ui components built on Radix UI
- **Styling**: Tailwind CSS with dark mode support
- **Package Manager**: Bun (always use Bun, not npm/yarn)
- **Code Quality**: Biome for linting and formatting
- **Deployment**: Static export to `out/` for Netlify/Vercel

**Key Files**:
- `src/app/layout.tsx` - Root layout with metadata
- `src/components/docs-layout.tsx` - Main docs layout with navigation
- `src/app/guide/` - Hierarchical documentation pages
- `biome.json` - Linter/formatter configuration

### API Backend (v0/)
- **Framework**: Node.js Express with ES modules
- **Architecture**: Modular monolithic API (replaced microservices)
- **AI Services**: Python FastAPI workers for AI processing
- **Configuration**: JSON-based pipeline routing system
- **API Spec**: OpenAPI 3.0 specification included

**Key Components**:
- `api/server.js` - Entry point
- `api/routes/video.js` - Main API endpoints
- `api/services/` - Business logic (script, video, voice generation)
- `shared/video_pipeline_config.json` - Service routing configuration
- `shared/openapi-ai-video-spec.yaml` - API specification

## API Endpoints (v0/api)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/video/generate` | Create AI video from inputs |
| GET | `/video/topics` | Get content topic presets |
| GET | `/video/themes` | Get caption theme presets |
| GET | `/video/voices` | Get available TTS voices |
| GET | `/video/styles` | Get supported image/video styles |
| GET | `/video/background-music` | Get background music tracks |
| GET | `/video/url?id=` | Poll video status and output URL |

**Authentication**: All endpoints require `X-API-KEY` header (currently mocked for testing)

**Video Modes**:
- `ai_generated` - Fully AI-generated visuals (Runway, Pika)
- `slideshow` - Still images + voice + captions via ffmpeg

## Code Quality & Standards

### Biome Configuration (docs/)
- **Formatter**: Space indentation, double quotes for JS
- **Linter**: Most recommended rules enabled
- **Accessibility**: Many a11y rules disabled (consider re-enabling)
- **Import Organization**: Automatically sorts imports

### File Patterns
- Use existing component patterns when creating new pages
- Follow shadcn/ui conventions for UI components
- Maintain consistency in API route structure
- Keep configuration-driven approach for video pipeline

## Key Development Patterns

### Documentation Site
1. **Page Structure**: DocsLayout → Breadcrumb → Header → Content → Navigation
2. **Navigation State**: Uses local state for sidebar and section expansion
3. **Component Creation**: Add to `src/components/ui/` using shadcn patterns
4. **New Pages**: Create in `src/app/guide/[category]/[page]/page.tsx`

### API Backend
1. **Route Organization**: Group related endpoints in route files
2. **Service Layer**: Separate business logic from route handlers
3. **Configuration**: Use `video_pipeline_config.json` for service routing
4. **Error Handling**: Consistent error responses across endpoints

## Testing & Quality Assurance

### Documentation Site
- Run `bun run lint` before commits to ensure TypeScript compliance
- Test static build with `bun run build` to verify export functionality
- Verify responsive design across mobile/desktop breakpoints

### API Backend
- Test endpoints using provided CLI tools or curl commands
- Validate against OpenAPI specification
- Ensure proper error handling and status codes

## Deployment Notes

### Documentation Site
- Builds to static files in `out/` directory
- Configured for both Netlify and Vercel deployment
- Uses trailing slashes for proper static hosting
- No server-side features due to static export

### API Backend
- Docker Compose setup includes Swagger UI at localhost:8080
- Supports both development and production environments
- Python AI logic service runs separately from main API
- Configuration-driven provider switching for AI services

## Adding New Features

### Documentation Pages
1. Create page file following existing structure
2. Update navigation in `docs-layout.tsx`
3. Add breadcrumb navigation
4. Follow card-based content organization

### API Endpoints
1. Add route handler in appropriate file under `api/routes/`
2. Implement service logic in `api/services/`
3. Update OpenAPI specification if needed
4. Add configuration mapping if using external services