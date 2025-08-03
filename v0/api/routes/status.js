import express from 'express';
import { validateApiKey } from '../utils/auth.js';
import { getJobStatus } from '../services/jobService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Apply API key validation to all routes
router.use(validateApiKey);

// Get video status by job ID
router.get('/:jobId', (req, res) => {
  const { jobId } = req.params;
  
  if (!jobId) {
    return res.status(400).json({ error: 'Job ID is required' });
  }
  
  logger.debug('Status check for job:', jobId);
  
  const jobStatus = getJobStatus(jobId);
  
  if (!jobStatus) {
    return res.status(404).json({ 
      error: 'Job not found',
      jobId 
    });
  }
  
  res.json(jobStatus);
});

// Legacy endpoint for backward compatibility
router.get('/', (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Job ID is required' });
  }
  
  // Redirect to new endpoint
  res.redirect(`/video/status/${id}`);
});

export default router;