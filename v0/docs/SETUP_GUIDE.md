# Setup & Configuration Guide

This guide covers the complete setup process for the AI Story API system, including environment configuration, API keys, and deployment options.

## Prerequisites

### System Requirements
- **Node.js:** 18.0 or higher
- **npm:** 8.0 or higher (or yarn/pnpm equivalent)
- **Python:** 3.8+ (for AI logic service, optional)
- **Docker:** Latest version (for containerized deployment, optional)

### API Keys Required
Before starting, obtain API keys from these providers:

- **OpenAI:** For script generation ([platform.openai.com](https://platform.openai.com))
- **ElevenLabs:** For voice synthesis ([elevenlabs.io](https://elevenlabs.io))
- **Runway ML:** For AI video generation ([runwayml.com](https://runwayml.com))
- **Pika Labs:** For creative AI videos ([pika.art](https://pika.art))

## Quick Start

### 1. Clone and Install
```bash
# Navigate to the project
cd potterlabs/v0

# Install API dependencies
cd api
npm install

# Install CLI dependencies (optional)
cd ../cli
npm install
```

### 2. Environment Configuration
```bash
# Copy the example environment file
cd ../api
cp .env.example .env

# Edit the .env file with your API keys
nano .env
```

### 3. Configure Environment Variables
Edit `/api/.env` with your actual API keys:

```bash
# API Configuration
PORT=3000
NODE_ENV=development

# API Keys for External Services
OPENAI_API_KEY=sk-your-actual-openai-key-here
ELEVENLABS_API_KEY=your-actual-elevenlabs-key-here
RUNWAY_API_KEY=your-actual-runway-key-here
PIKA_API_KEY=your-actual-pika-key-here

# Your API Key (for client authentication)
API_KEY=your-secure-api-key-for-clients

# Optional: Database configuration
# DATABASE_URL=postgresql://user:password@localhost:5432/ai_story_db
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 5. Verify Installation
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test API with authentication
curl -H "X-API-KEY: your-secure-api-key-for-clients" \
     http://localhost:3000/video/topics
```

## Detailed Configuration

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `3000` |
| `NODE_ENV` | No | Environment mode | `development` or `production` |
| `OPENAI_API_KEY` | Yes | OpenAI API key for script generation | `sk-...` |
| `ELEVENLABS_API_KEY` | Yes | ElevenLabs API key for TTS | `your-key` |
| `RUNWAY_API_KEY` | Yes | Runway ML API key | `your-key` |
| `PIKA_API_KEY` | Yes | Pika Labs API key | `your-key` |
| `API_KEY` | Yes* | Your API key for client auth | `secure-key` |
| `DATABASE_URL` | No | Database connection string | `postgresql://...` |

*Required for production, optional for development

### Provider Configuration

Edit `/shared/video_pipeline_config.json` to customize routing behavior:

```json
{
  "providers": {
    "runway": {
      "name": "Runway ML",
      "strengths": ["cinematic", "photorealistic", "complex_scenes"],
      "specialties": ["camera_movements", "long_duration", "narrative_flow"]
    }
    // ... more providers
  },
  "style_routing": {
    "cinematic": {
      "provider": "runway",
      "reason": "Runway's strength in camera work and narrative flow"
    }
    // ... more style mappings
  }
}
```

### Security Configuration

#### API Key Security
```bash
# Generate a secure API key
openssl rand -hex 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Production Security Checklist
- [ ] Use strong, unique API keys
- [ ] Enable HTTPS in production
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Implement rate limiting
- [ ] Use environment variables, never hardcode secrets
- [ ] Regular key rotation

### CORS Configuration

To allow specific domains, modify `/api/app.js`:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: [
    'https://yourdomain.com',
    'https://app.yourdomain.com'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

## Deployment Options

### Option 1: Traditional Server Deployment

#### Ubuntu/Debian Server
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/your-repo/ai-story-api.git
cd ai-story-api/v0/api
npm install --production

# Configure environment
sudo nano /etc/environment
# Add your environment variables

# Setup PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name "ai-story-api"
pm2 startup
pm2 save

# Setup nginx reverse proxy
sudo nano /etc/nginx/sites-available/ai-story-api
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Docker Deployment

#### Using Docker Compose
```bash
# Start full stack
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Custom Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### Option 3: Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-ai-story-api

# Configure environment variables
heroku config:set OPENAI_API_KEY=your-key
heroku config:set ELEVENLABS_API_KEY=your-key
heroku config:set RUNWAY_API_KEY=your-key
heroku config:set PIKA_API_KEY=your-key
heroku config:set API_KEY=your-secure-key

# Deploy
git push heroku main
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# or use CLI:
vercel env add OPENAI_API_KEY
```

#### AWS/GCP/Azure
- Use container services (ECS, Cloud Run, Container Instances)
- Configure environment variables in the cloud console
- Set up load balancers and auto-scaling as needed

## Development Setup

### Hot Reload Development
```bash
# Install nodemon globally
npm install -g nodemon

# Start with auto-reload
npm run dev
```

### Testing Setup
```bash
# Run API tests
npm test

# Test specific endpoints
curl -X POST -H "Content-Type: application/json" \
     -H "X-API-KEY: testkey" \
     -d '{"topic": "science", "style": "cinematic"}' \
     http://localhost:3000/video/generate
```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development DEBUG=* npm start
```

## Monitoring and Logging

### Log Configuration
Logs are output to console by default. For production, consider:

```javascript
// In utils/logger.js, add file logging:
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Monitoring
Set up monitoring for:
- `/health` endpoint status
- API response times
- Provider availability
- Queue lengths
- Error rates

### Metrics Collection
Consider integrating:
- **Prometheus** for metrics
- **Grafana** for visualization  
- **New Relic** or **DataDog** for APM
- **Sentry** for error tracking

## Troubleshooting

### Common Issues

#### Server Won't Start
```bash
# Check Node.js version
node --version

# Check port availability
lsof -i :3000

# Check environment variables
node -e "console.log(process.env)"
```

#### API Key Errors
```bash
# Verify .env file exists and is readable
ls -la .env
cat .env

# Test individual API keys
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models
```

#### Provider Routing Issues
```bash
# Check configuration file
cat ../shared/video_pipeline_config.json

# Test routing logic
node -e "
const { routeConfig } = require('./services/configRouter.js');
console.log(routeConfig('cinematic', { topic: 'science' }));
"
```

### Debug Commands

```bash
# Check server status
curl -v http://localhost:3000/health

# Test routing with different parameters
curl -X POST -H "Content-Type: application/json" \
     -H "X-API-KEY: testkey" \
     -d '{"topic": "test", "style": "cinematic", "duration": 60}' \
     http://localhost:3000/video/generate

# View server logs
tail -f combined.log

# Check process memory usage
ps aux | grep node
```

### Getting Help

- Check the [API Reference](API_REFERENCE.md)
- Review [Routing System docs](ROUTING_SYSTEM.md)
- Check server logs for error messages
- Verify all environment variables are set correctly
- Test individual provider API keys separately

## Performance Optimization

### Production Optimizations
```bash
# Use production Node.js optimizations
NODE_ENV=production npm start

# Enable gzip compression in nginx
gzip on;
gzip_types text/plain application/json;

# Set up caching for static responses
# Cache topics, voices, styles endpoints for 1 hour
```

### Resource Requirements
- **Memory:** 512MB minimum, 2GB recommended
- **CPU:** 1 core minimum, 2+ cores for concurrent requests  
- **Storage:** 10GB for logs and temporary files
- **Network:** Stable internet for provider API calls

### Scaling Considerations
- Use load balancers for multiple instances
- Implement job queues for high-volume processing
- Consider database for job persistence
- Monitor provider rate limits and costs