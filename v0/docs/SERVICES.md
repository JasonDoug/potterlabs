# Services Architecture

This document describes the service layer architecture of the AI Story API, including the responsibilities and interfaces of each service.

## Service Overview

The AI Story API is built with a modular service architecture that separates concerns and provides clean interfaces for different functionalities.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Routes      │    │    Services     │    │   Providers     │
│                 │    │                 │    │                 │
│ • generate.js   │───▶│ • configService │───▶│ • Runway ML     │
│ • status.js     │    │ • jobService    │    │ • Pika Labs     │
│ • config.js     │    │ • providerSvc   │    │ • Slideshow     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Services

### Configuration Service (`configService.js`)

**Purpose:** Centralized configuration data management and validation

**Responsibilities:**
- Store and serve all static configuration data (topics, voices, styles, themes, music)
- Validate request configurations
- Provide lookup functions for configuration items
- Ensure data consistency across the application

**Key Functions:**
```javascript
// Data retrieval
getTopics()           // Returns available content topics
getVoices()           // Returns available TTS voices  
getStyles()           // Returns available visual styles
getThemes()           // Returns available caption themes
getBackgroundMusic()  // Returns available music tracks

// Lookup functions
getVoiceById(id)      // Find specific voice by ID
getStyleById(id)      // Find specific style by ID
getTopicById(id)      // Find specific topic by ID

// Validation
validateConfig(config) // Validate request configuration
```

**Usage Example:**
```javascript
import { getVoices, validateConfig } from '../services/configService.js';

// Get all available voices
const voices = getVoices();

// Validate user configuration
const errors = validateConfig({
  topic: 'science',
  style: 'cinematic',
  voice: 'invalid_voice'
});
// Returns: ['Invalid voice: invalid_voice']
```

### Job Service (`jobService.js`)

**Purpose:** Job lifecycle management and tracking

**Responsibilities:**
- Create and track video generation jobs
- Manage job status and progress updates
- Handle job completion and failure states
- Provide job cleanup and maintenance
- Store job metadata and results

**Key Functions:**
```javascript
// Job management
createJob(config, routing)     // Create new job
getJob(jobId)                  // Retrieve job by ID
updateJob(jobId, updates)      // Update job properties
completeJob(jobId, result)     // Mark job as completed
failJob(jobId, error)          // Mark job as failed

// Status tracking
getJobStatus(jobId)            // Get current job status
listJobs(limit, status)        // List jobs with filters
cleanupOldJobs(maxAge)         // Remove old jobs
```

**Job Lifecycle:**
1. **Creation** - Job created with `processing` status
2. **Processing** - Provider generates content (progress updates)
3. **Completion** - Job finished with results or error
4. **Cleanup** - Automatic removal after 24 hours

**Usage Example:**
```javascript
import { createJob, getJobStatus } from '../services/jobService.js';

// Create new job
const jobResponse = createJob(config, routing);
console.log(jobResponse.jobId); // job_1754217099267_d3hjgjrc2

// Check job status
const status = getJobStatus(jobResponse.jobId);
console.log(status.status); // 'processing' or 'completed'
```

### Provider Service (`providerService.js`)

**Purpose:** Provider-specific video generation orchestration

**Responsibilities:**
- Route generation requests to appropriate providers
- Handle provider-specific logic and API calls
- Provide unified response format across providers
- Manage provider health and capabilities
- Simulate realistic processing times

**Key Functions:**
```javascript
// Generation
generateWithProvider(config, routing)  // Generate video with specific provider

// Provider management
checkProviderHealth(provider)          // Check provider availability
getProviderCapabilities(provider)      // Get provider limits and features

// Provider-specific generators
generateWithRunway(config, routing)    // Runway ML generation
generateWithPika(config, routing)      // Pika Labs generation  
generateWithSlideshow(config, routing) // Slideshow generation
```

**Provider Characteristics:**

| Provider | Type | Processing Time | Quality | Resolution | Features |
|----------|------|----------------|---------|------------|----------|
| Runway | `runway_video` | 5-8 seconds | High | 1920x1080 | Cinematic, camera movements |
| Pika | `pika_video` | 2-4 seconds | Creative | 720x1280 | Animation, artistic effects |
| Slideshow | `slideshow` | 0.5-1.5 seconds | Standard | 1920x1080 | Cost-effective, educational |

**Usage Example:**
```javascript
import { generateWithProvider } from '../services/providerService.js';

// Generate video with routing decision
const result = await generateWithProvider(config, {
  provider: 'runway',
  mode: 'ai_generated',
  reason: 'Cinematic style best suited for Runway'
});

console.log(result.type);        // 'runway_video'
console.log(result.videoUrl);    // Video download URL
console.log(result.quality);     // 'high'
```

### Routing Service (`configRouter.js`)

**Purpose:** Intelligent provider selection based on request parameters

**Responsibilities:**
- Analyze request parameters to determine optimal provider
- Apply routing rules and decision logic
- Provide fallback options for provider failures
- Load and manage routing configuration

**Routing Priority:**
1. **Direct Style Mapping** - Explicit style-to-provider mapping
2. **Content Type Routing** - Route based on content category
3. **Duration-Based Routing** - Optimize for video length
4. **Smart Topic Analysis** - Keyword-based content analysis
5. **Default Fallback** - Runway as default provider

**Usage Example:**
```javascript
import { routeConfig } from '../services/configRouter.js';

// Get routing decision
const routing = routeConfig('cinematic', {
  topic: 'science',
  duration: 60,
  contentType: 'educational'
});

console.log(routing.provider); // 'runway'
console.log(routing.reason);   // 'Runway's strength in camera work...'
```

## Supporting Services

### Script Generator (`scriptGenerator.js`)

**Purpose:** Generate structured scripts for video content

**Functions:**
```javascript
generateScript(topic, prompt, style)    // Generate full script
generateImagePrompts(script, style)     // Create image prompts from script
```

### Voice Generator (`voiceGenerator.js`)

**Purpose:** Text-to-speech synthesis

**Functions:**
```javascript
generateVoice(text, voiceId, options)     // Generate single audio clip
generateVoiceForScript(script, voiceId)   // Generate audio for full script
```

## Service Integration Patterns

### Route → Service Integration

Routes act as thin controllers that delegate to services:

```javascript
// routes/generate.js
router.post('/', async (req, res) => {
  // 1. Validate with configService
  const errors = validateConfig(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Invalid configuration', details: errors });
  }
  
  // 2. Get routing decision
  const routing = routeConfig(req.body.style, req.body);
  
  // 3. Create job
  const jobResponse = createJob(req.body, routing);
  
  // 4. Start async generation
  generateVideoAsync(jobResponse.jobId, req.body, routing);
  
  // 5. Return immediate response
  res.status(202).json(jobResponse);
});
```

### Async Processing Pattern

Video generation happens asynchronously to avoid blocking requests:

```javascript
const generateVideoAsync = async (jobId, config, routing) => {
  try {
    // Generate with appropriate provider
    const result = await generateWithProvider(config, routing);
    
    // Update job with completion
    completeJob(jobId, result);
  } catch (error) {
    // Handle failures
    failJob(jobId, error);
  }
};
```

### Error Handling Strategy

Services use consistent error handling patterns:

```javascript
// Service function with error handling
export const generateScript = async (topic, prompt, style) => {
  try {
    logger.info('Generating script for:', { topic, prompt, style });
    
    // Service logic here
    const result = await performGeneration();
    
    logger.info('Script generated successfully');
    return result;
    
  } catch (error) {
    logger.error('Script generation failed:', error);
    throw new Error('Failed to generate script');
  }
};
```

## Configuration and Data Flow

### Data Sources
- **Static Configuration** - Topics, voices, styles stored in configService
- **Routing Rules** - Provider selection logic in shared/video_pipeline_config.json
- **Job State** - In-memory storage with automatic cleanup
- **Provider Responses** - Structured data from external APIs

### Data Flow
1. **Request** → Route validates using configService
2. **Routing** → configRouter determines provider
3. **Job Creation** → jobService creates tracking record
4. **Processing** → providerService generates content
5. **Completion** → jobService updates with results
6. **Status Check** → Client polls jobService for updates

## Testing Services

### Unit Testing
Test individual service functions in isolation:

```javascript
// Test configService validation
const errors = validateConfig({ style: 'invalid' });
assert(errors.includes('Invalid style: invalid'));

// Test job creation
const job = createJob(config, routing);
assert(job.jobId.startsWith('job_'));
```

### Integration Testing
Test service interactions:

```javascript
// Test full generation flow
const jobResponse = createJob(config, routing);
const result = await generateWithProvider(config, routing);
const status = getJobStatus(jobResponse.jobId);
assert(status.status === 'completed');
```

## Performance Considerations

### Memory Management
- **Job Cleanup** - Automatic removal of old jobs prevents memory leaks
- **Configuration Caching** - Static data cached in memory for fast access
- **Async Processing** - Non-blocking generation prevents request queuing

### Scalability
- **Stateless Services** - All services can be scaled horizontally
- **Provider Abstraction** - Easy to add new providers or load balance
- **Job Distribution** - Future: Redis/database for multi-instance job sharing

## Future Enhancements

### Planned Service Improvements
- **Database Integration** - Persistent job storage with PostgreSQL/MongoDB
- **Provider Health Monitoring** - Real-time provider availability checking
- **Job Queuing** - Redis-based job queue for better resource management
- **Webhook Service** - Job completion notifications via webhooks
- **Metrics Service** - Usage analytics and performance monitoring

This service architecture provides a solid foundation for scaling the AI Story API while maintaining clean separation of concerns and testability.