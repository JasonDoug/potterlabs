import express from 'express';
import { validateApiKey } from '../utils/auth.js';
import { generateScript } from '../services/scriptGenerator.js';
import { generateVideo } from '../services/videoGenerator.js';
import { generateVoice } from '../services/voiceGenerator.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Apply API key validation to all routes
router.use(validateApiKey);

// Generate video endpoint
router.post('/generate', async (req, res) => {
  try {
    const { topic, prompt, style, duration, theme, voice } = req.body;
    
    if (!topic && !prompt) {
      return res.status(400).json({ error: 'Either topic or prompt is required' });
    }
    
    if (!style) {
      return res.status(400).json({ error: 'Style is required' });
    }
    
    logger.info('Video generation request:', { topic, prompt, style, duration, theme, voice });
    
    // Use the routing system to determine provider
    const { routeConfig } = await import('../services/configRouter.js');
    const routing = routeConfig(style, { 
      topic, 
      duration, 
      contentType: theme 
    });
    
    logger.info('Routing decision:', routing);
    
    // Generate a job ID for tracking
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Enhanced response with routing information
    const response = {
      jobId,
      status: 'processing',
      message: 'Video generation started',
      estimatedTime: routing.provider === 'pika' ? '1-3 minutes' : 
                    routing.provider === 'runway' ? '3-8 minutes' : '30-60 seconds',
      pollUrl: `/video/url?id=${jobId}`,
      provider: routing.provider,
      mode: routing.mode,
      reason: routing.reason
    };
    
    res.status(202).json(response);
    
    // TODO: Implement actual video generation pipeline with routing.provider
    
  } catch (error) {
    logger.error('Video generation error:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// Get video status and URL
router.get('/url', (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Job ID is required' });
  }
  
  // Mock response for now
  const response = {
    jobId: id,
    status: 'completed',
    videoUrl: `https://example.com/videos/${id}.mp4`,
    thumbnailUrl: `https://example.com/thumbnails/${id}.jpg`,
    duration: 30,
    createdAt: new Date().toISOString()
  };
  
  res.json(response);
});

// Get available topics
router.get('/topics', (req, res) => {
  const topics = [
    { id: 'history', name: 'History', description: 'Historical events and figures' },
    { id: 'science', name: 'Science', description: 'Scientific discoveries and concepts' },
    { id: 'technology', name: 'Technology', description: 'Tech innovations and trends' },
    { id: 'nature', name: 'Nature', description: 'Wildlife and natural phenomena' },
    { id: 'space', name: 'Space', description: 'Astronomy and space exploration' },
    { id: 'custom', name: 'Custom', description: 'Custom story from your prompt' }
  ];
  
  res.json({ topics });
});

// Get available themes
router.get('/themes', (req, res) => {
  const themes = [
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary styling' },
    { id: 'classic', name: 'Classic', description: 'Traditional, elegant styling' },
    { id: 'bold', name: 'Bold', description: 'High contrast, vibrant colors' },
    { id: 'minimal', name: 'Minimal', description: 'Simple, clean design' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-style presentation' }
  ];
  
  res.json({ themes });
});

// Get available voices
router.get('/voices', (req, res) => {
  const voices = [
    { id: 'sarah', name: 'Sarah', gender: 'female', accent: 'american', description: 'Professional female voice' },
    { id: 'mike', name: 'Mike', gender: 'male', accent: 'american', description: 'Confident male voice' },
    { id: 'emma', name: 'Emma', gender: 'female', accent: 'british', description: 'British female voice' },
    { id: 'james', name: 'James', gender: 'male', accent: 'british', description: 'British male voice' },
    { id: 'maria', name: 'Maria', gender: 'female', accent: 'spanish', description: 'Spanish accent female voice' }
  ];
  
  res.json({ voices });
});

// Get available styles
router.get('/styles', (req, res) => {
  const styles = [
    { id: 'photorealistic', name: 'Photorealistic', mode: 'ai_generated', description: 'Realistic AI-generated visuals' },
    { id: 'cinematic', name: 'Cinematic', mode: 'ai_generated', description: 'Movie-style AI visuals' },
    { id: 'animation', name: 'Animation', mode: 'ai_generated', description: 'Animated AI-generated content' },
    { id: 'slideshow_modern', name: 'Modern Slideshow', mode: 'slideshow', description: 'Clean slideshow with images' },
    { id: 'slideshow_classic', name: 'Classic Slideshow', mode: 'slideshow', description: 'Traditional slideshow format' }
  ];
  
  res.json({ styles });
});

// Get background music options
router.get('/background-music', (req, res) => {
  const music = [
    { id: 'ambient1', name: 'Gentle Ambient', genre: 'ambient', duration: 180, mood: 'calm' },
    { id: 'upbeat1', name: 'Uplifting Corporate', genre: 'corporate', duration: 150, mood: 'energetic' },
    { id: 'dramatic1', name: 'Dramatic Orchestral', genre: 'orchestral', duration: 200, mood: 'dramatic' },
    { id: 'tech1', name: 'Tech Innovation', genre: 'electronic', duration: 160, mood: 'modern' },
    { id: 'nature1', name: 'Nature Sounds', genre: 'ambient', duration: 300, mood: 'peaceful' }
  ];
  
  res.json({ music });
});

export default router;
