# Video Generation Examples

This directory contains example configurations and usage patterns for the Potter Labs AI video generation system.

## Architecture Overview

The system now uses a **two-tier architecture**:

1. **Python AI Logic Service** (port 8000) - Main orchestrator with intelligent provider routing
2. **Node.js Provider API** (port 3000) - Provider-agnostic video generation execution

## Quick Start

### Using the CLI (Recommended)

```bash
# Interactive video builder
cd v0/ai-logic
python cli.py orchestrate --interactive

# Analyze a configuration
python cli.py analyze ../examples/video-config.json

# Check provider status
python cli.py providers

# Health check all services
python cli.py health
```

### Using Direct API Calls

#### 1. Orchestrated Request (Recommended)
```bash
curl -X POST http://localhost:8000/orchestrate/video \
  -H "Content-Type: application/json" \
  -d @video-config.json
```

#### 2. Direct Provider API (Advanced)
```bash
curl -X POST http://localhost:3000/video/generate \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: testkey" \
  -d '{
    "topic": "AI in Healthcare",
    "style": "cinematic",
    "duration": 60,
    "provider": "runway",
    "mode": "ai_generated"
  }'
```

## Configuration Examples

### Corporate Video
```json
{
  "topic": "Company Quarterly Results",
  "style": "cinematic",
  "theme": "corporate",
  "duration": 90,
  "content_type": "corporate",
  "priority": "high"
}
```

### Educational Content
```json
{
  "topic": "Introduction to Quantum Physics",
  "style": "slideshow_modern", 
  "theme": "educational",
  "duration": 180,
  "content_type": "educational",
  "voice_style": "teacher"
}
```

### Creative/Artistic Video
```json
{
  "topic": "Abstract Art Through the Ages",
  "style": "artistic",
  "duration": 45,
  "content_type": "creative",
  "preferred_provider": "pika"
}
```

## Batch Processing

Create multiple configuration files and process them in batch:

```bash
python cli.py batch examples/*.json --batch-size 3
```

## Provider Selection

The AI Logic service automatically selects providers based on:

- **Style compatibility**: Each provider excels at different visual styles
- **Content type**: Educational vs entertainment vs corporate requirements  
- **Duration optimization**: Short vs long-form content efficiency
- **Cost considerations**: Balancing quality vs cost based on priority
- **Real-time availability**: Health checking and failover handling

### Provider Strengths

- **Runway ML**: Cinematic, photorealistic, documentary content
- **Pika Labs**: Animation, artistic, creative, abstract content  
- **Gemini Veo**: Fast animation, creative effects, cost-effective
- **Slideshow**: Educational, presentations, long-form, cost-effective

## Monitoring and Debugging

```bash
# Check service health
python cli.py health

# Get provider status and capabilities
python cli.py providers

# Analyze routing decision without executing
python cli.py analyze config.json
```

## Environment Variables

```bash
# Service URLs
export AI_LOGIC_URL="http://localhost:8000"
export NODE_API_URL="http://localhost:3000"

# Provider API Keys (optional - for actual generation)
export RUNWAY_API_KEY="your_key_here"
export PIKA_API_KEY="your_key_here"
export GEMINI_API_KEY="your_key_here"

# Authentication
export API_KEY="testkey"
```

## Docker Deployment

```bash
# Start full stack
cd v0
docker-compose up

# Services will be available at:
# - AI Logic Service: http://localhost:8000
# - Node Provider API: http://localhost:3000  
# - Swagger UI: http://localhost:8080
```