import { logger } from '../utils/logger.js';

// In-memory job storage (replace with database in production)
const jobs = new Map();

export const createJob = (config, routing) => {
  const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const job = {
    id: jobId,
    status: 'processing',
    config,
    routing,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedTime: getEstimatedTime(routing.provider),
    progress: 0
  };
  
  jobs.set(jobId, job);
  logger.info(`Job created: ${jobId}`, { provider: routing.provider, mode: routing.mode });
  
  return {
    jobId,
    status: job.status,
    message: 'Video generation started',
    estimatedTime: job.estimatedTime,
    pollUrl: `/video/status/${jobId}`,
    provider: routing.provider,
    mode: routing.mode,
    reason: routing.reason
  };
};

export const getJob = (jobId) => {
  const job = jobs.get(jobId);
  if (!job) {
    logger.warn(`Job not found: ${jobId}`);
    return null;
  }
  
  logger.debug(`Job retrieved: ${jobId}`, { status: job.status });
  return job;
};

export const updateJob = (jobId, updates) => {
  const job = jobs.get(jobId);
  if (!job) {
    logger.warn(`Cannot update job - not found: ${jobId}`);
    return null;
  }
  
  const updatedJob = {
    ...job,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  jobs.set(jobId, updatedJob);
  logger.info(`Job updated: ${jobId}`, { status: updatedJob.status, progress: updatedJob.progress });
  
  return updatedJob;
};

export const completeJob = (jobId, result) => {
  const job = jobs.get(jobId);
  if (!job) {
    logger.warn(`Cannot complete job - not found: ${jobId}`);
    return null;
  }
  
  const completedJob = updateJob(jobId, {
    status: 'completed',
    progress: 100,
    result,
    completedAt: new Date().toISOString()
  });
  
  logger.info(`Job completed: ${jobId}`, { 
    duration: new Date() - new Date(job.createdAt),
    provider: job.routing.provider
  });
  
  return completedJob;
};

export const failJob = (jobId, error) => {
  const job = jobs.get(jobId);
  if (!job) {
    logger.warn(`Cannot fail job - not found: ${jobId}`);
    return null;
  }
  
  const failedJob = updateJob(jobId, {
    status: 'failed',
    error: error.message || error,
    failedAt: new Date().toISOString()
  });
  
  logger.error(`Job failed: ${jobId}`, { error: error.message || error });
  
  return failedJob;
};

export const getJobStatus = (jobId) => {
  const job = getJob(jobId);
  if (!job) {
    return null;
  }
  
  // Mock completion for demo purposes
  // In production, this would check actual job progress
  const shouldComplete = Math.random() > 0.3; // 70% chance of completion
  
  if (job.status === 'processing' && shouldComplete) {
    const mockResult = {
      videoUrl: `https://example.com/videos/${jobId}.mp4`,
      thumbnailUrl: `https://example.com/thumbnails/${jobId}.jpg`,
      duration: job.config.duration || 30,
      provider: job.routing.provider,
      mode: job.routing.mode
    };
    
    completeJob(jobId, mockResult);
    return {
      jobId,
      status: 'completed',
      ...mockResult,
      createdAt: job.createdAt
    };
  }
  
  return {
    jobId,
    status: job.status,
    progress: job.progress,
    estimatedTime: job.estimatedTime,
    createdAt: job.createdAt,
    ...(job.error && { error: job.error }),
    ...(job.result && job.result)
  };
};

export const listJobs = (limit = 50, status = null) => {
  let jobList = Array.from(jobs.values());
  
  if (status) {
    jobList = jobList.filter(job => job.status === status);
  }
  
  return jobList
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
    .map(job => ({
      id: job.id,
      status: job.status,
      provider: job.routing.provider,
      mode: job.routing.mode,
      createdAt: job.createdAt,
      progress: job.progress
    }));
};

export const cleanupOldJobs = (maxAge = 24 * 60 * 60 * 1000) => {
  const cutoff = new Date(Date.now() - maxAge);
  let cleaned = 0;
  
  for (const [jobId, job] of jobs.entries()) {
    if (new Date(job.createdAt) < cutoff) {
      jobs.delete(jobId);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    logger.info(`Cleaned up ${cleaned} old jobs`);
  }
  
  return cleaned;
};

const getEstimatedTime = (provider) => {
  switch (provider) {
    case 'pika':
      return '1-3 minutes';
    case 'runway':
      return '3-8 minutes';
    case 'slideshow':
      return '30-60 seconds';
    default:
      return '2-5 minutes';
  }
};

// Auto-cleanup old jobs every hour
setInterval(() => {
  cleanupOldJobs();
}, 60 * 60 * 1000);