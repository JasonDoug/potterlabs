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

# For Python AI logic service (main orchestrator)
cd v0/ai-logic
pip install -r requirements.txt
python main.py       # Start orchestration service on port 8000

# CLI orchestration tool
cd v0/ai-logic
python cli.py orchestrate --interactive  # Interactive video builder
python cli.py providers                   # Check provider status
python cli.py health                      # Health check all services

# Docker deployment
cd v0
docker-compose up    # Start full stack: AI Logic (8000) + Node API (3000) + Swagger UI (8080)
```

### CLI Tools
```bash
cd v0/cli
node create-ai-video.mjs    # Interactive video config generator
npm install                 # Install CLI dependencies first

# Python alternative CLI tool
cd v0/cli
python create_video_config.py
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
- **Architecture**: Two-tier system with Python orchestrator + Node.js provider API
- **Main Orchestrator**: Python FastAPI service with intelligent routing (port 8000)
- **Provider API**: Node.js Express API for provider-agnostic video generation (port 3000)
- **CLI Interface**: Click-based terminal interface for interactive workflows
- **API Spec**: OpenAPI 3.0 specification included
- **Testing**: Built-in test commands with `npm test`

**Key Components**:
- `ai-logic/main.py` - Main orchestration service with routing intelligence
- `ai-logic/routing.py` - Provider selection algorithms and heuristics
- `ai-logic/orchestrator.py` - Request preparation and provider configuration
- `ai-logic/cli.py` - Interactive CLI for video orchestration
- `api/server.js` - Provider-agnostic Node.js API entry point
- `api/routes/generate.js` - Simple provider execution (no routing logic)
- `api/services/` - Provider-specific generation logic
- `shared/video_pipeline_config.json` - Provider capabilities reference
- `shared/openapi-ai-video-spec.yaml` - Complete API specification

## API Endpoints

### AI Logic Service (port 8000) - Main Orchestrator
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/orchestrate/video` | Main orchestration endpoint with intelligent routing |
| POST | `/analyze/request` | Analyze request and return routing recommendations |
| GET | `/providers/status` | Get health status of all providers |
| GET | `/providers/capabilities` | Get capabilities of all providers |
| POST | `/batch/orchestrate` | Batch orchestration for multiple requests |
| GET | `/health` | Health check endpoint |

### Node.js Provider API (port 3000) - Provider Execution
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/video/generate` | Execute video generation with explicit provider |
| GET | `/video/providers/health` | Provider health check |
| GET | `/video/providers` | Get available providers |
| GET | `/video/topics` | Get content topic presets |
| GET | `/video/themes` | Get caption theme presets |
| GET | `/video/voices` | Get available TTS voices |
| GET | `/video/styles` | Get supported image/video styles |
| GET | `/video/background-music` | Get background music tracks |
| GET | `/video/url?id=` | Poll video status and output URL |

### CLI Commands
```bash
python cli.py orchestrate --interactive    # Interactive video builder
python cli.py providers                    # Show provider status
python cli.py analyze config.json         # Analyze configuration
python cli.py batch *.json                # Batch process multiple configs
python cli.py health                       # Health check all services
```

**Authentication**: All endpoints require `X-API-KEY` header (currently mocked for testing)

**New Architecture Flow**:
1. **Client** → Python AI Logic Service (intelligent routing)
2. **AI Logic** → Node.js Provider API (explicit provider execution)
3. **Provider API** → External AI services (Runway, Pika, etc.)

**Provider Routing** (now handled by Python AI Logic):
- **Intelligent Analysis**: Multi-factor scoring based on style, content, duration, cost
- **Health Checking**: Real-time provider availability monitoring  
- **Fallback Handling**: Automatic failover with style adaptations
- **Batch Optimization**: Efficient processing for multiple requests

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
- Run `npm test` in v0/api directory for automated tests
- Test endpoints using provided CLI tools or curl commands
- Validate against OpenAPI specification in shared/ directory
- Use Docker Compose for full integration testing
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
- Python AI logic service runs separately from main API (port 8000)
- Configuration-driven provider switching for AI services
- Uses shared volume mounts for configuration files
- Environment variables configured via .env files

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