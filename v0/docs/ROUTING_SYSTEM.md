# Provider Routing System

The AI Story API uses an intelligent routing system to automatically select the optimal AI provider based on content type, style, and other parameters.

## Supported Providers

### Runway ML
**Best for:** Realistic, cinematic content with complex camera movements

- **Strengths:** Photorealistic visuals, narrative flow, professional quality
- **Specialties:** Camera movements, long-duration content, documentary style
- **Typical Generation Time:** 3-8 minutes
- **Use Cases:** Corporate videos, documentaries, realistic storytelling

### Pika Labs  
**Best for:** Creative, artistic, and animated content

- **Strengths:** Animation, artistic styles, experimental effects
- **Specialties:** Fast generation, stylized content, creative expression
- **Typical Generation Time:** 1-3 minutes  
- **Use Cases:** Creative projects, animated content, artistic videos

### Slideshow Engine
**Best for:** Educational content and cost-effective presentations

- **Strengths:** Cost-effective, educational focus, voice-over friendly
- **Specialties:** Still images, presentations, long-form content
- **Typical Generation Time:** 30-60 seconds
- **Use Cases:** Educational materials, tutorials, presentations

## Routing Logic

The system uses a **priority-based routing system** with the following decision order:

### 1. Direct Style Mapping (Highest Priority)

Direct style-to-provider mappings defined in the configuration:

```json
{
  "photorealistic": "runway",
  "cinematic": "runway", 
  "animation": "pika",
  "artistic": "pika",
  "abstract": "pika",
  "documentary": "runway",
  "slideshow_modern": "slideshow",
  "slideshow_classic": "slideshow"
}
```

**Example:**
```json
{"style": "cinematic"} → runway (reason: "Runway's strength in camera work and narrative flow")
```

### 2. Content Type Routing

Routes based on the general content category:

| Content Type | Preferred Provider | Fallback |
|--------------|-------------------|----------|
| Educational  | Slideshow         | Runway   |
| Entertainment| Pika              | Runway   |
| Corporate    | Runway            | Slideshow|
| Creative     | Pika              | Runway   |

**Example:**
```json
{"theme": "educational"} → slideshow (reason: "Educational content works well with slideshow format")
```

### 3. Duration-Based Routing

Routes based on video length for optimal cost and quality:

| Duration Range | Preferred Provider | Reasoning |
|----------------|-------------------|-----------|
| ≤ 30 seconds  | Pika              | Faster generation for short clips |
| 31-120 seconds| Runway            | Better for medium-length content |
| > 120 seconds | Slideshow         | Most cost-effective for long content |

**Example:**
```json
{"duration": 15} → pika (reason: "Pika faster for short clips")
```

### 4. Smart Topic Analysis

Analyzes topic/prompt content using keyword detection:

#### Educational Keywords → Slideshow
- Keywords: `education`, `learn`, `science`, `history`
- Reasoning: Educational content works well with slideshow format

#### Creative Keywords → Pika  
- Keywords: `creative`, `art`, `fantasy`, `abstract`
- Reasoning: Creative content suited for Pika's artistic capabilities

#### Realistic Keywords → Runway
- Keywords: `documentary`, `realistic`, `corporate`, `professional`
- Reasoning: Realistic content suited for Runway's cinematic quality

**Example:**
```json
{"topic": "science"} → slideshow (reason: "Educational content works well with slideshow format")
```

### 5. Default Fallback

If no specific routing rules match:
```json
default → runway (reason: "Default provider for general AI video generation")
```

## Configuration File

The routing system is configured via `/shared/video_pipeline_config.json`:

```json
{
  "providers": {
    "runway": {
      "name": "Runway ML",
      "strengths": ["cinematic", "photorealistic", "complex_scenes"],
      "specialties": ["camera_movements", "long_duration", "narrative_flow"]
    },
    "pika": {
      "name": "Pika Labs", 
      "strengths": ["animation", "creative_effects", "stylized"],
      "specialties": ["artistic_styles", "fast_generation", "experimental"]
    },
    "slideshow": {
      "name": "Static Slideshow",
      "strengths": ["educational", "presentation", "cost_effective"],
      "specialties": ["still_images", "voice_over", "captions"]
    }
  },
  "style_routing": {
    "photorealistic": {
      "provider": "runway",
      "reason": "Runway excels at realistic, cinematic content"
    }
    // ... more style mappings
  },
  "content_type_routing": {
    "educational": {
      "prefer": "slideshow", 
      "fallback": "runway"
    }
    // ... more content type mappings
  },
  "duration_routing": {
    "short": {
      "max_seconds": 30,
      "prefer": "pika",
      "reason": "Pika faster for short clips"
    }
    // ... more duration ranges
  }
}
```

## Routing Examples

### Example 1: Educational Science Video
```json
{
  "topic": "science",
  "style": "slideshow_modern",
  "duration": 120
}
```
**Route:** slideshow  
**Reason:** Direct style mapping to slideshow provider  
**Mode:** slideshow

### Example 2: Creative Animation
```json
{
  "topic": "art", 
  "style": "animation",
  "duration": 15
}
```
**Route:** pika  
**Reason:** Pika specializes in animated and stylized content  
**Mode:** ai_generated

### Example 3: Corporate Presentation
```json
{
  "topic": "corporate",
  "style": "cinematic", 
  "duration": 60
}
```
**Route:** runway  
**Reason:** Runway's strength in camera work and narrative flow  
**Mode:** ai_generated

### Example 4: Long Educational Content
```json
{
  "topic": "history",
  "prompt": "The history of ancient civilizations",
  "duration": 300
}
```
**Route:** slideshow  
**Reason:** Slideshow more cost-effective for long content  
**Mode:** slideshow

## API Response

When a routing decision is made, the API returns detailed information:

```json
{
  "jobId": "job_1754217099267_d3hjgjrc2",
  "status": "processing",
  "message": "Video generation started",
  "estimatedTime": "3-8 minutes",
  "provider": "runway",
  "mode": "ai_generated", 
  "reason": "Runway's strength in camera work and narrative flow"
}
```

## Customizing Routing

### Adding New Providers

1. Add provider configuration to `providers` section
2. Update routing rules in `style_routing`, `content_type_routing`, etc.
3. Implement provider-specific generation logic in services

### Modifying Routing Rules

Edit `/shared/video_pipeline_config.json` to:
- Change style-to-provider mappings
- Adjust duration thresholds
- Add new content type categories
- Modify keyword detection logic

### Testing Routing

Use the API to test routing decisions:

```bash
curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: testkey" \
  -d '{"topic": "science", "style": "cinematic", "duration": 60}' \
  http://localhost:3000/video/generate
```

The response will show which provider was selected and why.

## Performance Considerations

- **Pika Labs:** Fastest generation (1-3 minutes) but best for creative content
- **Runway ML:** Medium speed (3-8 minutes) but highest quality for realistic content  
- **Slideshow:** Fastest processing (30-60 seconds) but static images only

Choose routing rules based on your priority: speed vs. quality vs. cost.

## Fallback Handling

If a primary provider fails:
1. Check if routing configuration specifies a fallback provider
2. Use default provider (Runway) if no fallback specified
3. Return error if all providers fail

Future versions will implement automatic provider failover based on availability and queue length.