# AI Story API Documentation

Complete documentation for the AI Story API system - a powerful platform for generating narrated AI videos with intelligent provider routing.

## 📚 Documentation Index

### Core Documentation
- **[API Reference](API_REFERENCE.md)** - Complete endpoint documentation and request/response formats
- **[Setup Guide](SETUP_GUIDE.md)** - Installation, configuration, and deployment instructions
- **[Routing System](ROUTING_SYSTEM.md)** - Intelligent provider selection and configuration
- **[CLI Guide](CLI_GUIDE.md)** - Interactive command-line tool usage
- **[Examples](EXAMPLES.md)** - Practical use cases and integration examples

## 🚀 Quick Start

### 1. Installation
```bash
cd v0/api
npm install
```

### 2. Configuration
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Start Server
```bash
npm start
```

### 4. Test API
```bash
curl -H "X-API-KEY: your_key" http://localhost:3000/video/topics
```

## 🎯 Key Features

### Intelligent Provider Routing
- **Runway ML** for cinematic, photorealistic content
- **Pika Labs** for creative, animated videos  
- **Slideshow** for educational, cost-effective content
- Automatic routing based on style, content type, and duration

### Comprehensive API
- RESTful endpoints for video generation
- Real-time job status tracking
- Extensive customization options
- Multiple voice and style choices

### Developer Tools
- Interactive CLI for configuration creation
- Comprehensive documentation with examples
- Multiple integration patterns (Node.js, Python, React)
- Docker deployment support

## 📖 Documentation Overview

### [API Reference](API_REFERENCE.md)
Complete endpoint documentation including:
- Authentication requirements
- Request/response formats
- Error handling
- Rate limiting guidelines

### [Setup Guide](SETUP_GUIDE.md)
Comprehensive setup instructions covering:
- Environment configuration
- API key management
- Security best practices
- Deployment options (Docker, cloud platforms)
- Monitoring and troubleshooting

### [Routing System](ROUTING_SYSTEM.md)
Detailed explanation of the intelligent routing system:
- Provider capabilities and strengths
- Routing decision logic
- Configuration options
- Performance considerations

### [CLI Guide](CLI_GUIDE.md)
Interactive command-line tool documentation:
- Installation and usage
- Configuration options
- Integration with API
- Troubleshooting tips

### [Examples](EXAMPLES.md)
Practical use cases and integration patterns:
- Educational content creation
- Creative project examples
- Business and marketing videos
- Code examples for popular languages

## 🔧 Quick Reference

### Common API Endpoints
```bash
# Health check
GET /health

# Generate video
POST /video/generate

# Check video status
GET /video/url?id={jobId}

# Get available options
GET /video/topics
GET /video/voices
GET /video/styles
```

### Provider Routing Examples
```bash
# Educational → Slideshow
{"topic": "science", "style": "slideshow_modern"}

# Creative → Pika
{"topic": "art", "style": "animation"}

# Professional → Runway
{"topic": "corporate", "style": "cinematic"}
```

### CLI Quick Start
```bash
cd v0/cli
npm install
node create-ai-video.mjs
```

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Tool      │    │   API Server    │    │   Providers     │
│                 │    │                 │    │                 │
│ • Interactive   │───▶│ • Routing       │───▶│ • Runway ML     │
│ • Config Gen    │    │ • Authentication│    │ • Pika Labs     │
│ • Validation    │    │ • Job Management│    │ • Slideshow     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for script generation | Yes |
| `ELEVENLABS_API_KEY` | ElevenLabs key for voice synthesis | Yes |
| `RUNWAY_API_KEY` | Runway ML key for AI video | Yes |
| `PIKA_API_KEY` | Pika Labs key for creative videos | Yes |
| `API_KEY` | Your API key for client authentication | Yes |

## 📱 Integration Examples

### Node.js
```javascript
const response = await fetch('/video/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.API_KEY
  },
  body: JSON.stringify({
    topic: 'science',
    style: 'cinematic',
    duration: 60
  })
});
```

### Python
```python
import requests

response = requests.post('/video/generate', 
  headers={'X-API-KEY': 'your_key'},
  json={'topic': 'science', 'style': 'cinematic'}
)
```

### cURL
```bash
curl -X POST -H "X-API-KEY: your_key" \
  -d '{"topic": "science", "style": "cinematic"}' \
  http://localhost:3000/video/generate
```

## 🚀 Deployment Options

- **Local Development:** Node.js + npm
- **Docker:** Complete containerized stack
- **Cloud Platforms:** Heroku, Vercel, AWS, GCP
- **Traditional Servers:** PM2 + Nginx

## 🛠️ Support & Development

### Getting Help
1. Check the relevant documentation section
2. Review error messages and logs
3. Verify API key configuration
4. Test with provided examples

### Contributing
- Follow existing code patterns
- Update documentation for changes
- Test thoroughly before submitting
- Include examples for new features

### Troubleshooting
- **Server won't start:** Check Node.js version and dependencies
- **API errors:** Verify environment variables and API keys
- **Routing issues:** Review configuration file and logs
- **Performance:** Monitor provider response times and costs

## 📄 License

This project is proprietary to Potter Labs. See license file for details.

---

**Potter Labs AI Story API** - Transforming text into engaging visual stories through intelligent AI provider routing.