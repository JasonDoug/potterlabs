import express from 'express';
import { validateApiKey } from '../utils/auth.js';
import { validateConfig } from '../services/configService.js';
import { createJob } from '../services/jobService.js';
import { generateWithProvider } from '../services/providerService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Apply API key validation to all routes
router.use(validateApiKey);

// Generate video endpoint - now provider-agnostic
router.post('/', async (req, res) => {
  try {
    const config = req.body;
    
    // Validate configuration
    const validationErrors = validateConfig(config);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid configuration', 
        details: validationErrors 
      });
    }
    
    // Require explicit provider specification
    if (!config.provider) {
      return res.status(400).json({ 
        error: 'Provider must be explicitly specified',
        details: ['provider field is required']
      });
    }
    
    logger.info('Video generation request:', config);
    
    // Create routing object from explicit provider
    const routing = {
      provider: config.provider,
      mode: config.mode || (config.provider === 'slideshow' ? 'slideshow' : 'ai_generated'),
      reason: config.routing_reason || 'Explicitly specified by client',
      adaptiveRouting: false
    };
    
    logger.info('Using explicit provider:', routing);
    
    // Create job for tracking
    const jobResponse = createJob(config, routing);
    
    // Start async generation (don't await)
    generateVideoAsync(jobResponse.jobId, config, routing);
    
    res.status(202).json(jobResponse);
    
  } catch (error) {
    logger.error('Video generation error:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// Provider health check endpoint
router.get('/providers/health', async (req, res) => {
  try {
    // Check which providers are available
    const providers = {
      runway: {
        healthy: !!process.env.RUNWAY_API_KEY,
        reason: process.env.RUNWAY_API_KEY ? 'API key available' : 'No API key'
      },
      pika: {
        healthy: !!process.env.PIKA_API_KEY,
        reason: process.env.PIKA_API_KEY ? 'API key available' : 'No API key'
      },
      gemini_veo: {
        healthy: !!process.env.GEMINI_API_KEY,
        reason: process.env.GEMINI_API_KEY ? 'API key available' : 'No API key'
      },
      slideshow: {
        healthy: true,
        reason: 'Always available (local generation)'
      }
    };
    
    res.json({ providers });
    
  } catch (error) {
    logger.error('Provider health check error:', error);
    res.status(500).json({ error: 'Failed to check provider health' });
  }
});

// Get available providers endpoint
router.get('/providers', async (req, res) => {
  try {
    const availableProviders = [];
    
    if (process.env.RUNWAY_API_KEY) {
      availableProviders.push({
        name: 'runway',
        capabilities: ['cinematic', 'photorealistic', 'documentary'],
        maxDuration: 300,
        quality: 'high'
      });
    }
    
    if (process.env.PIKA_API_KEY) {
      availableProviders.push({
        name: 'pika',
        capabilities: ['animation', 'artistic', 'abstract'],
        maxDuration: 120,
        quality: 'creative'
      });
    }
    
    if (process.env.GEMINI_API_KEY) {
      availableProviders.push({
        name: 'gemini_veo',
        capabilities: ['animation', 'creative', 'artistic'],
        maxDuration: 180,
        quality: 'creative'
      });
    }
    
    // Slideshow is always available
    availableProviders.push({
      name: 'slideshow',
      capabilities: ['educational', 'presentation', 'cost_effective'],
      maxDuration: 600,
      quality: 'standard'
    });
    
    res.json({ providers: availableProviders });
    
  } catch (error) {
    logger.error('Get providers error:', error);
    res.status(500).json({ error: 'Failed to get providers' });
  }
});

// Async video generation function
const generateVideoAsync = async (jobId, config, routing) => {
  try {
    logger.info(`Starting async generation for job ${jobId} with provider ${routing.provider}`);
    
    // Generate video with the specified provider
    const result = await generateWithProvider(config, routing);
    
    // Update job with completion
    const { completeJob } = await import('../services/jobService.js');
    completeJob(jobId, result);
    
    logger.info(`Job ${jobId} completed successfully`);
    
  } catch (error) {
    logger.error(`Job ${jobId} failed:`, error);
    
    // Update job with failure
    const { failJob } = await import('../services/jobService.js');
    failJob(jobId, error);
  }
};

export default router;