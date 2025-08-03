# Examples & Use Cases

This document provides practical examples of using the AI Story API for various video generation scenarios.

## Quick Start Examples

### Example 1: Educational Science Video

**Scenario:** Create an educational video explaining photosynthesis for middle school students.

**CLI Configuration:**
```bash
node create-ai-video.mjs
# Select: Modern Slideshow, Sarah voice, Modern theme, 120 seconds, Science topic
```

**API Request:**
```bash
curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: your_key" \
  -d '{
    "topic": "science",
    "prompt": "Explain photosynthesis in simple terms for middle school students",
    "style": "slideshow_modern",
    "voice": "sarah",
    "theme": "modern",
    "duration": 120,
    "aspect_ratio": "16:9",
    "include_voiceover": true,
    "bg_music": "ambient1"
  }' \
  http://localhost:3000/video/generate
```

**Expected Routing:**
- **Provider:** Slideshow
- **Reason:** Educational content + slideshow style + medium duration
- **Generation Time:** 30-60 seconds

**Response:**
```json
{
  "jobId": "job_1754217123456_abc123",
  "status": "processing",
  "provider": "slideshow",
  "mode": "slideshow",
  "estimatedTime": "30-60 seconds",
  "reason": "Educational content works well with slideshow format"
}
```

---

### Example 2: Creative Animation Project

**Scenario:** Create an artistic animated video for a creative portfolio.

**API Request:**
```bash
curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: your_key" \
  -d '{
    "topic": "custom",
    "prompt": "Abstract shapes and colors dancing to a rhythm, transforming into natural forms",
    "style": "animation",
    "voice": "emma",
    "theme": "artistic",
    "duration": 30,
    "aspect_ratio": "1:1",
    "include_voiceover": false,
    "bg_music": "upbeat1"
  }' \
  http://localhost:3000/video/generate
```

**Expected Routing:**
- **Provider:** Pika Labs
- **Reason:** Animation style + creative content + short duration
- **Generation Time:** 1-3 minutes

---

### Example 3: Corporate Presentation

**Scenario:** Create a professional video introduction for a company's AI platform.

**API Request:**
```bash
curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: your_key" \
  -d '{
    "topic": "technology",
    "prompt": "Professional introduction to our revolutionary AI platform that transforms business operations",
    "style": "cinematic",
    "voice": "james",
    "theme": "classic",
    "duration": 90,
    "aspect_ratio": "16:9",
    "include_voiceover": true,
    "bg_music": "tech1"
  }' \
  http://localhost:3000/video/generate
```

**Expected Routing:**
- **Provider:** Runway ML
- **Reason:** Cinematic style + professional content + medium duration
- **Generation Time:** 3-8 minutes

---

## Use Case Categories

### Educational Content

#### History Documentary
```json
{
  "topic": "history",
  "prompt": "The rise and fall of the Roman Empire: key events and figures",
  "style": "documentary",
  "voice": "james",
  "theme": "classic",
  "duration": 180,
  "aspect_ratio": "16:9",
  "include_voiceover": true,
  "bg_music": "dramatic1"
}
```
**Routes to:** Runway (documentary style) → Slideshow (long duration)

#### Science Explainer
```json
{
  "topic": "science", 
  "prompt": "How vaccines work: immune system response explained simply",
  "style": "slideshow_modern",
  "voice": "sarah",
  "theme": "minimal",
  "duration": 90,
  "include_voiceover": true
}
```
**Routes to:** Slideshow (educational + slideshow style)

### Creative Projects

#### Art Installation Preview
```json
{
  "topic": "custom",
  "prompt": "Surreal landscapes with impossible architecture and floating geometric shapes",
  "style": "artistic",
  "voice": "maria",
  "theme": "bold",
  "duration": 45,
  "aspect_ratio": "9:16",
  "bg_music": "ambient1"
}
```
**Routes to:** Pika (artistic style + creative content)

#### Music Video Concept
```json
{
  "topic": "custom",
  "prompt": "Electronic music visualization: beats transforming into light patterns and digital rain",
  "style": "abstract",
  "duration": 60,
  "aspect_ratio": "16:9",
  "include_voiceover": false,
  "bg_music": "tech1"
}
```
**Routes to:** Pika (abstract style + creative content)

### Business & Marketing

#### Product Launch
```json
{
  "topic": "technology",
  "prompt": "Introducing the future of smart home automation with seamless AI integration",
  "style": "photorealistic",
  "voice": "mike",
  "theme": "modern",
  "duration": 60,
  "aspect_ratio": "16:9",
  "include_voiceover": true,
  "bg_music": "upbeat1"
}
```
**Routes to:** Runway (photorealistic style + tech content)

#### Company Culture Video
```json
{
  "topic": "custom",
  "prompt": "Our team's journey: innovation, collaboration, and building the future together",
  "style": "cinematic",
  "voice": "sarah",
  "theme": "modern",
  "duration": 120,
  "include_voiceover": true,
  "bg_music": "upbeat1"
}
```
**Routes to:** Runway (cinematic style + medium duration)

### Social Media Content

#### Instagram Reel
```json
{
  "topic": "nature",
  "prompt": "Quick facts about ocean wildlife: amazing creatures in 30 seconds",
  "style": "animation",
  "voice": "emma",
  "theme": "bold",
  "duration": 30,
  "aspect_ratio": "9:16",
  "include_voiceover": true,
  "bg_music": "nature1"
}
```
**Routes to:** Pika (animation + short duration)

#### TikTok Educational
```json
{
  "topic": "science",
  "prompt": "Mind-blowing space facts that will change your perspective on the universe",
  "style": "slideshow_modern",
  "voice": "mike",
  "theme": "bold",
  "duration": 15,
  "aspect_ratio": "9:16",
  "include_voiceover": true
}
```
**Routes to:** Slideshow (educational) vs Pika (short duration)

## Integration Examples

### Node.js Integration

```javascript
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Generate video endpoint
app.post('/create-video', async (req, res) => {
  try {
    const { userPrompt, videoType } = req.body;
    
    // Configure based on video type
    let config;
    switch(videoType) {
      case 'educational':
        config = {
          topic: 'science',
          prompt: userPrompt,
          style: 'slideshow_modern',
          voice: 'sarah',
          theme: 'modern',
          duration: 120,
          include_voiceover: true
        };
        break;
        
      case 'creative':
        config = {
          topic: 'custom',
          prompt: userPrompt,
          style: 'animation',
          voice: 'emma',
          theme: 'artistic',
          duration: 30,
          include_voiceover: false,
          bg_music: 'ambient1'
        };
        break;
        
      case 'corporate':
        config = {
          topic: 'technology',
          prompt: userPrompt,
          style: 'cinematic',
          voice: 'james',
          theme: 'classic',
          duration: 60,
          include_voiceover: true,
          bg_music: 'tech1'
        };
        break;
    }
    
    // Call AI Story API
    const response = await fetch('http://localhost:3000/video/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.AI_STORY_API_KEY
      },
      body: JSON.stringify(config)
    });
    
    const result = await response.json();
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Integration server running on port 3001');
});
```

### Python Integration

```python
import requests
import json
import time

class AIVideoGenerator:
    def __init__(self, api_key, base_url="http://localhost:3000"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': api_key
        }
    
    def generate_educational_video(self, topic, prompt, duration=120):
        """Generate educational video optimized for learning."""
        config = {
            "topic": topic,
            "prompt": prompt,
            "style": "slideshow_modern",
            "voice": "sarah",
            "theme": "modern",
            "duration": duration,
            "aspect_ratio": "16:9",
            "include_voiceover": True,
            "bg_music": "ambient1"
        }
        return self._generate_video(config)
    
    def generate_creative_video(self, prompt, duration=30):
        """Generate creative video for artistic projects."""
        config = {
            "topic": "custom",
            "prompt": prompt,
            "style": "animation",
            "voice": "emma",
            "theme": "artistic",
            "duration": duration,
            "aspect_ratio": "1:1",
            "include_voiceover": False,
            "bg_music": "upbeat1"
        }
        return self._generate_video(config)
    
    def generate_corporate_video(self, prompt, duration=60):
        """Generate professional corporate video."""
        config = {
            "topic": "technology",
            "prompt": prompt,
            "style": "cinematic",
            "voice": "james",
            "theme": "classic",
            "duration": duration,
            "aspect_ratio": "16:9",
            "include_voiceover": True,
            "bg_music": "tech1"
        }
        return self._generate_video(config)
    
    def _generate_video(self, config):
        """Internal method to generate video."""
        response = requests.post(
            f"{self.base_url}/video/generate",
            headers=self.headers,
            json=config
        )
        return response.json()
    
    def get_video_status(self, job_id):
        """Check video generation status."""
        response = requests.get(
            f"{self.base_url}/video/url",
            headers=self.headers,
            params={"id": job_id}
        )
        return response.json()
    
    def wait_for_completion(self, job_id, poll_interval=10, max_wait=600):
        """Wait for video generation to complete."""
        start_time = time.time()
        
        while time.time() - start_time < max_wait:
            status = self.get_video_status(job_id)
            
            if status.get('status') == 'completed':
                return status
            elif status.get('status') == 'failed':
                raise Exception(f"Video generation failed: {status}")
            
            time.sleep(poll_interval)
        
        raise TimeoutError("Video generation timed out")

# Usage example
generator = AIVideoGenerator(api_key="your_api_key")

# Generate educational video
result = generator.generate_educational_video(
    topic="science",
    prompt="Explain quantum entanglement in simple terms",
    duration=90
)

print(f"Job ID: {result['jobId']}")
print(f"Provider: {result['provider']}")
print(f"Estimated time: {result['estimatedTime']}")

# Wait for completion
final_result = generator.wait_for_completion(result['jobId'])
print(f"Video URL: {final_result['videoUrl']}")
```

### React Frontend Integration

```jsx
import React, { useState } from 'react';

const VideoGenerator = () => {
  const [config, setConfig] = useState({
    topic: 'science',
    prompt: '',
    style: 'cinematic',
    duration: 60
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(config)
      });
      
      const data = await response.json();
      setResult(data);
      
      // Poll for completion
      pollVideoStatus(data.jobId);
      
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setLoading(false);
    }
  };

  const pollVideoStatus = async (jobId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/video/url?id=${jobId}`, {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY }
        });
        
        const status = await response.json();
        
        if (status.status === 'completed') {
          setResult(status);
          clearInterval(interval);
        } else if (status.status === 'failed') {
          console.error('Video generation failed');
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error polling status:', error);
        clearInterval(interval);
      }
    }, 10000); // Poll every 10 seconds
  };

  return (
    <div className="video-generator">
      <h2>AI Video Generator</h2>
      
      <div className="form-group">
        <label>Topic:</label>
        <select 
          value={config.topic} 
          onChange={(e) => setConfig({...config, topic: e.target.value})}
        >
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="technology">Technology</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="form-group">
        <label>Prompt:</label>
        <textarea
          value={config.prompt}
          onChange={(e) => setConfig({...config, prompt: e.target.value})}
          placeholder="Enter your video prompt..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Style:</label>
        <select
          value={config.style}
          onChange={(e) => setConfig({...config, style: e.target.value})}
        >
          <option value="cinematic">Cinematic (Runway)</option>
          <option value="animation">Animation (Pika)</option>
          <option value="slideshow_modern">Modern Slideshow</option>
        </select>
      </div>

      <button onClick={generateVideo} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Video'}
      </button>

      {result && (
        <div className="result">
          <h3>Generation Result</h3>
          <p><strong>Job ID:</strong> {result.jobId}</p>
          <p><strong>Provider:</strong> {result.provider}</p>
          <p><strong>Status:</strong> {result.status}</p>
          {result.videoUrl && (
            <div>
              <p><strong>Video ready!</strong></p>
              <video controls src={result.videoUrl} width="400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
```

## Performance Optimization Examples

### Batch Processing
```javascript
// Process multiple videos efficiently
const batchGenerate = async (prompts) => {
  const jobs = [];
  
  // Start all jobs
  for (const prompt of prompts) {
    const config = {
      topic: 'custom',
      prompt,
      style: 'slideshow_modern', // Fastest generation
      duration: 30,
      include_voiceover: true
    };
    
    const response = await fetch('/video/generate', {
      method: 'POST',
      headers: { 'X-API-KEY': API_KEY },
      body: JSON.stringify(config)
    });
    
    jobs.push(await response.json());
  }
  
  // Wait for all to complete
  const results = await Promise.all(
    jobs.map(job => waitForCompletion(job.jobId))
  );
  
  return results;
};
```

### Caching Strategy
```javascript
// Cache frequently requested data
const cache = new Map();

const getCachedTopics = async () => {
  if (!cache.has('topics')) {
    const response = await fetch('/video/topics');
    const topics = await response.json();
    cache.set('topics', topics);
    // Cache for 1 hour
    setTimeout(() => cache.delete('topics'), 3600000);
  }
  return cache.get('topics');
};
```

This comprehensive documentation should help users understand how to effectively use the AI Story API for their specific needs and integrate it into their applications.