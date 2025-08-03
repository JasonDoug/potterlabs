# AI Story API Reference

This documentation covers the complete AI Story API for generating narrated AI videos with intelligent provider routing.

## Base URL

```
http://localhost:3000
```

## Authentication

All endpoints require an API key in the request headers:

```http
X-API-KEY: your_api_key_here
```

## Endpoints

### Health Check

**GET** `/health`

Returns the API status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-08-03T10:30:00.000Z"
}
```

---

### Generate Video

**POST** `/video/generate`

Creates a new AI video generation job with intelligent provider routing.

**Request Body:**
```json
{
  "topic": "science",           // Required if no prompt
  "prompt": "Custom prompt",    // Required if no topic
  "style": "cinematic",         // Required
  "voice": "sarah",             // Optional
  "theme": "modern",            // Optional
  "duration": 60,               // Optional (seconds)
  "aspect_ratio": "16:9",       // Optional
  "include_voiceover": true,    // Optional
  "bg_music": "default",        // Optional
  "language": "English"         // Optional
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | Yes* | Content category (history, science, technology, nature, space, custom) |
| `prompt` | string | Yes* | Custom text prompt for video content |
| `style` | string | Yes | Visual style (see [Styles](#available-styles)) |
| `voice` | string | No | Voice ID for narration (see [Voices](#available-voices)) |
| `theme` | string | No | Caption theme (see [Themes](#available-themes)) |
| `duration` | number | No | Video duration in seconds |
| `aspect_ratio` | string | No | Video dimensions (9:16, 1:1, 16:9) |
| `include_voiceover` | boolean | No | Include AI-generated voiceover |
| `bg_music` | string | No | Background music track |
| `language` | string | No | Narration language |

*Either `topic` or `prompt` is required.

**Response:**
```json
{
  "jobId": "job_1754217099267_d3hjgjrc2",
  "status": "processing",
  "message": "Video generation started",
  "estimatedTime": "3-8 minutes",
  "pollUrl": "/video/url?id=job_1754217099267_d3hjgjrc2",
  "provider": "runway",
  "mode": "ai_generated",
  "reason": "Runway's strength in camera work and narrative flow"
}
```

**Status Codes:**
- `202` - Job created successfully
- `400` - Invalid request parameters
- `401` - Invalid or missing API key
- `500` - Internal server error

---

### Get Video Status

**GET** `/video/url`

Retrieves the status and download URL of a video generation job.

**Query Parameters:**
- `id` (required) - Job ID returned from `/video/generate`

**Example:**
```
GET /video/url?id=job_1754217099267_d3hjgjrc2
```

**Response:**
```json
{
  "jobId": "job_1754217099267_d3hjgjrc2",
  "status": "completed",
  "videoUrl": "https://example.com/videos/job_1754217099267_d3hjgjrc2.mp4",
  "thumbnailUrl": "https://example.com/thumbnails/job_1754217099267_d3hjgjrc2.jpg",
  "duration": 60,
  "createdAt": "2025-08-03T10:30:00.000Z"
}
```

**Status Values:**
- `processing` - Video is being generated
- `completed` - Video is ready for download
- `failed` - Generation failed
- `queued` - Job is waiting in queue

---

### Get Available Topics

**GET** `/video/topics`

Returns available content topics for video generation.

**Response:**
```json
{
  "topics": [
    {
      "id": "history",
      "name": "History",
      "description": "Historical events and figures"
    },
    {
      "id": "science",
      "name": "Science", 
      "description": "Scientific discoveries and concepts"
    },
    {
      "id": "technology",
      "name": "Technology",
      "description": "Tech innovations and trends"
    },
    {
      "id": "nature",
      "name": "Nature",
      "description": "Wildlife and natural phenomena"
    },
    {
      "id": "space",
      "name": "Space",
      "description": "Astronomy and space exploration"
    },
    {
      "id": "custom",
      "name": "Custom",
      "description": "Custom story from your prompt"
    }
  ]
}
```

---

### Get Available Themes

**GET** `/video/themes`

Returns available caption themes for video styling.

**Response:**
```json
{
  "themes": [
    {
      "id": "modern",
      "name": "Modern",
      "description": "Clean, contemporary styling"
    },
    {
      "id": "classic",
      "name": "Classic",
      "description": "Traditional, elegant styling"
    },
    {
      "id": "bold",
      "name": "Bold",
      "description": "High contrast, vibrant colors"
    },
    {
      "id": "minimal",
      "name": "Minimal",
      "description": "Simple, clean design"
    },
    {
      "id": "cinematic",
      "name": "Cinematic",
      "description": "Movie-style presentation"
    }
  ]
}
```

---

### Get Available Voices

**GET** `/video/voices`

Returns available text-to-speech voices for narration.

**Response:**
```json
{
  "voices": [
    {
      "id": "sarah",
      "name": "Sarah",
      "gender": "female",
      "accent": "american",
      "description": "Professional female voice"
    },
    {
      "id": "mike",
      "name": "Mike",
      "gender": "male",
      "accent": "american",
      "description": "Confident male voice"
    },
    {
      "id": "emma",
      "name": "Emma",
      "gender": "female",
      "accent": "british",
      "description": "British female voice"
    },
    {
      "id": "james",
      "name": "James",
      "gender": "male",
      "accent": "british",
      "description": "British male voice"
    },
    {
      "id": "maria",
      "name": "Maria",
      "gender": "female",
      "accent": "spanish",
      "description": "Spanish accent female voice"
    }
  ]
}
```

---

### Get Available Styles

**GET** `/video/styles`

Returns available visual styles and their associated providers.

**Response:**
```json
{
  "styles": [
    {
      "id": "photorealistic",
      "name": "Photorealistic",
      "mode": "ai_generated",
      "description": "Realistic AI-generated visuals"
    },
    {
      "id": "cinematic",
      "name": "Cinematic",
      "mode": "ai_generated",
      "description": "Movie-style AI visuals"
    },
    {
      "id": "animation",
      "name": "Animation",
      "mode": "ai_generated",
      "description": "Animated AI-generated content"
    },
    {
      "id": "slideshow_modern",
      "name": "Modern Slideshow",
      "mode": "slideshow",
      "description": "Clean slideshow with images"
    },
    {
      "id": "slideshow_classic",
      "name": "Classic Slideshow",
      "mode": "slideshow",
      "description": "Traditional slideshow format"
    }
  ]
}
```

---

### Get Background Music

**GET** `/video/background-music`

Returns available background music tracks.

**Response:**
```json
{
  "music": [
    {
      "id": "ambient1",
      "name": "Gentle Ambient",
      "genre": "ambient",
      "duration": 180,
      "mood": "calm"
    },
    {
      "id": "upbeat1",
      "name": "Uplifting Corporate",
      "genre": "corporate",
      "duration": 150,
      "mood": "energetic"
    },
    {
      "id": "dramatic1",
      "name": "Dramatic Orchestral",
      "genre": "orchestral",
      "duration": 200,
      "mood": "dramatic"
    },
    {
      "id": "tech1",
      "name": "Tech Innovation",
      "genre": "electronic",
      "duration": 160,
      "mood": "modern"
    },
    {
      "id": "nature1",
      "name": "Nature Sounds",
      "genre": "ambient",
      "duration": 300,
      "mood": "peaceful"
    }
  ]
}
```

## Error Handling

The API uses standard HTTP status codes and returns error details in JSON format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common Error Codes:**
- `400` - Bad Request (missing or invalid parameters)
- `401` - Unauthorized (invalid or missing API key)
- `404` - Not Found (invalid endpoint or job ID)
- `500` - Internal Server Error (server-side issue)

## Rate Limiting

Currently no rate limiting is implemented, but it's recommended to:
- Limit concurrent video generation requests
- Poll job status no more than once every 10 seconds
- Cache endpoint responses for topics, voices, styles, etc.

## Webhooks (Planned)

Future versions will support webhook notifications for job completion:

```json
{
  "event": "video.completed",
  "jobId": "job_1754217099267_d3hjgjrc2",
  "status": "completed",
  "videoUrl": "https://example.com/videos/job_1754217099267_d3hjgjrc2.mp4"
}
```