import express from 'express';
import { validateApiKey } from '../utils/auth.js';
import { validateConfig } from '../services/configService.js';
import { routeConfig } from '../services/configRouter.js';
import { dynamicRouteConfig, getAvailableProviders } from '../services/dynamicRouter.js';
import { createJob } from '../services/jobService.js';
import { generateWithProvider } from '../services/providerService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Apply API key validation to all routes
router.use(validateApiKey);

// Generate video endpoint
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
    
    logger.info('Video generation request:', config);
    
    // Determine provider routing (use dynamic routing if available)
    let routing;
    try {
      routing = await dynamicRouteConfig(config.style, { 
        topic: config.topic, 
        duration: config.duration, 
        contentType: config.theme 
      });
    } catch (error) {
      // Fallback to static routing if dynamic fails
      logger.warn('Dynamic routing failed, using static routing:', error.message);
      routing = routeConfig(config.style, { 
        topic: config.topic, 
        duration: config.duration, 
        contentType: config.theme 
      });
    }
    
    logger.info('Routing decision:', routing);
    
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

// Async video generation function
const generateVideoAsync = async (jobId, config, routing) => {
  try {
    logger.info(`Starting async generation for job ${jobId}`);
    
    // Generate video with the appropriate provider
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