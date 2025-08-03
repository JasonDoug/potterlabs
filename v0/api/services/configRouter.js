import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

// Load configuration
let config;
try {
  const configPath = path.resolve('..', 'shared', 'video_pipeline_config.json');
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
} catch (error) {
  logger.error('Failed to load video pipeline config:', error);
  config = { style_routing: {}, content_type_routing: {}, duration_routing: {} };
}

export function routeConfig(style = '', options = {}) {
  const { contentType, duration, topic } = options;
  
  // 1. Check direct style routing first
  if (config.style_routing[style]) {
    const routing = config.style_routing[style];
    logger.info(`Routing style "${style}" to ${routing.provider}: ${routing.reason}`);
    return {
      provider: routing.provider,
      reason: routing.reason,
      mode: routing.provider === 'slideshow' ? 'slideshow' : 'ai_generated'
    };
  }
  
  // 2. Check content type routing
  if (contentType && config.content_type_routing[contentType]) {
    const routing = config.content_type_routing[contentType];
    logger.info(`Routing content type "${contentType}" to ${routing.prefer}`);
    return {
      provider: routing.prefer,
      fallback: routing.fallback,
      mode: routing.prefer === 'slideshow' ? 'slideshow' : 'ai_generated'
    };
  }
  
  // 3. Check duration-based routing
  if (duration) {
    for (const [durationType, durConfig] of Object.entries(config.duration_routing)) {
      if (duration <= durConfig.max_seconds) {
        logger.info(`Routing ${duration}s duration to ${durConfig.prefer}: ${durConfig.reason}`);
        return {
          provider: durConfig.prefer,
          reason: durConfig.reason,
          mode: durConfig.prefer === 'slideshow' ? 'slideshow' : 'ai_generated'
        };
      }
    }
  }
  
  // 4. Smart routing based on topic/prompt content
  if (topic) {
    const topicLower = topic.toLowerCase();
    
    // Educational content -> prefer slideshow
    if (topicLower.includes('education') || topicLower.includes('learn') || 
        topicLower.includes('science') || topicLower.includes('history')) {
      return {
        provider: 'slideshow',
        reason: 'Educational content works well with slideshow format',
        mode: 'slideshow'
      };
    }
    
    // Creative/artistic content -> prefer Pika
    if (topicLower.includes('creative') || topicLower.includes('art') || 
        topicLower.includes('fantasy') || topicLower.includes('abstract')) {
      return {
        provider: 'pika',
        reason: 'Creative content suited for Pika\'s artistic capabilities',
        mode: 'ai_generated'
      };
    }
    
    // Realistic/documentary content -> prefer Runway
    if (topicLower.includes('documentary') || topicLower.includes('realistic') || 
        topicLower.includes('corporate') || topicLower.includes('professional')) {
      return {
        provider: 'runway',
        reason: 'Realistic content suited for Runway\'s cinematic quality',
        mode: 'ai_generated'
      };
    }
  }
  
  // 5. Default fallback
  logger.info(`No specific routing found for style "${style}", using default: Runway`);
  return {
    provider: 'runway',
    reason: 'Default provider for general AI video generation',
    mode: 'ai_generated'
  };
}

export function getProviderInfo() {
  return config.providers || {};
}

export function getRoutingRules() {
  return {
    styleRouting: config.style_routing || {},
    contentTypeRouting: config.content_type_routing || {},
    durationRouting: config.duration_routing || {}
  };
}
