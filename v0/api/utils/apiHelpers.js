import { logger } from './logger.js';

// Rate limiting and retry logic for external APIs
export class APIRateLimiter {
  constructor() {
    this.requestCounts = new Map();
    this.resetTimes = new Map();
    
    // Rate limits per provider (requests per minute)
    this.limits = {
      openai_dalle: 50,
      openai_tts: 50,
      stability_ai: 150,
      elevenlabs: 120,
      runway: 30,
      pika: 60
    };
  }
  
  async checkRateLimit(provider) {
    const limit = this.limits[provider];
    if (!limit) return true;
    
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const key = `${provider}_${minute}`;
    
    const currentCount = this.requestCounts.get(key) || 0;
    
    if (currentCount >= limit) {
      const waitTime = ((minute + 1) * 60000) - now;
      logger.warn(`Rate limit reached for ${provider}, waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.checkRateLimit(provider);
    }
    
    this.requestCounts.set(key, currentCount + 1);
    
    // Clean up old entries
    for (const [oldKey] of this.requestCounts) {
      const [, oldMinute] = oldKey.split('_');
      if (parseInt(oldMinute) < minute - 5) { // Keep last 5 minutes
        this.requestCounts.delete(oldKey);
      }
    }
    
    return true;
  }
}

export const rateLimiter = new APIRateLimiter();

// Retry wrapper for API calls
export async function withRetry(apiCall, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    exponentialBackoff = true,
    retryCondition = (error) => error.status >= 500 || error.status === 429
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Check if we should retry
      if (!retryCondition(error)) {
        break;
      }
      
      // Calculate delay
      let delay = exponentialBackoff 
        ? Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
        : baseDelay;
      
      // Add jitter
      delay += Math.random() * 1000;
      
      logger.warn(`API call failed (attempt ${attempt + 1}/${maxRetries + 1}): ${error.message}. Retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// Enhanced error handling for API responses
export function handleAPIError(error, provider) {
  const errorInfo = {
    provider,
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack
  };
  
  // Parse common API error patterns
  if (error.response) {
    errorInfo.status = error.response.status;
    errorInfo.statusText = error.response.statusText;
    
    switch (error.response.status) {
      case 400:
        errorInfo.type = 'bad_request';
        errorInfo.userMessage = 'Invalid request parameters';
        break;
      case 401:
        errorInfo.type = 'unauthorized';
        errorInfo.userMessage = 'API key is invalid or missing';
        break;
      case 403:
        errorInfo.type = 'forbidden';
        errorInfo.userMessage = 'Access denied or quota exceeded';
        break;
      case 404:
        errorInfo.type = 'not_found';
        errorInfo.userMessage = 'Requested resource not found';
        break;
      case 429:
        errorInfo.type = 'rate_limited';
        errorInfo.userMessage = 'Too many requests, please try again later';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorInfo.type = 'server_error';
        errorInfo.userMessage = 'Service temporarily unavailable';
        break;
      default:
        errorInfo.type = 'unknown';
        errorInfo.userMessage = 'An unexpected error occurred';
    }
  } else {
    errorInfo.type = 'network_error';
    errorInfo.userMessage = 'Network connection failed';
  }
  
  logger.error(`API Error (${provider}):`, errorInfo);
  return errorInfo;
}

// Circuit breaker pattern for failing services
export class CircuitBreaker {
  constructor(provider, options = {}) {
    this.provider = provider;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000; // 1 minute
    this.monitoringPeriod = options.monitoringPeriod || 120000; // 2 minutes
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
        logger.info(`Circuit breaker for ${this.provider} entering HALF_OPEN state`);
      } else {
        throw new Error(`Circuit breaker is OPEN for ${this.provider}. Service temporarily unavailable.`);
      }
    }
    
    try {
      const result = await operation();
      
      if (this.state === 'HALF_OPEN') {
        this.successCount++;
        if (this.successCount >= 3) {
          this.reset();
          logger.info(`Circuit breaker for ${this.provider} reset to CLOSED state`);
        }
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
  
  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.state === 'HALF_OPEN' || this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      logger.warn(`Circuit breaker for ${this.provider} OPENED after ${this.failureCount} failures`);
    }
  }
  
  reset() {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
  
  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      successCount: this.successCount
    };
  }
}

// Global circuit breakers for each provider
export const circuitBreakers = {
  openai_dalle: new CircuitBreaker('openai_dalle'),
  openai_tts: new CircuitBreaker('openai_tts'),
  stability_ai: new CircuitBreaker('stability_ai'),
  elevenlabs: new CircuitBreaker('elevenlabs'),
  runway: new CircuitBreaker('runway'),
  pika: new CircuitBreaker('pika')
};

// Health check utilities
export async function checkServiceHealth(provider, healthCheckFn) {
  const circuitBreaker = circuitBreakers[provider];
  
  try {
    const result = await circuitBreaker.execute(async () => {
      const start = Date.now();
      await healthCheckFn();
      return { responseTime: Date.now() - start };
    });
    
    return {
      provider,
      status: 'healthy',
      responseTime: result.responseTime,
      circuitState: circuitBreaker.getState().state
    };
  } catch (error) {
    return {
      provider,
      status: 'unhealthy',
      error: error.message,
      circuitState: circuitBreaker.getState().state
    };
  }
}

// Cost tracking (optional)
export class CostTracker {
  constructor() {
    this.costs = new Map();
    
    // Estimated costs per provider operation (in USD)
    this.rates = {
      openai_dalle: 0.040, // $0.040 per image
      openai_tts: 0.015,   // $0.015 per 1K characters
      stability_ai: 0.018, // $0.018 per image
      elevenlabs: 0.0001,  // ~$0.30 per 1K characters
      runway: 0.12,        // ~$0.12 per second
      pika: 0.08          // ~$0.08 per second
    };
  }
  
  trackUsage(provider, units, metadata = {}) {
    const rate = this.rates[provider] || 0;
    const cost = rate * units;
    
    const today = new Date().toISOString().split('T')[0];
    const key = `${provider}_${today}`;
    
    const existing = this.costs.get(key) || { units: 0, cost: 0, requests: 0 };
    existing.units += units;
    existing.cost += cost;
    existing.requests += 1;
    
    this.costs.set(key, existing);
    
    logger.info(`Cost tracking: ${provider} - ${units} units, $${cost.toFixed(4)}`, metadata);
    
    return { dailyCost: existing.cost, totalRequests: existing.requests };
  }
  
  getDailyCosts(date = null) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const costs = {};
    
    for (const [key, value] of this.costs) {
      const [provider, keyDate] = key.split('_');
      if (keyDate === targetDate) {
        costs[provider] = value;
      }
    }
    
    return costs;
  }
}

export const costTracker = new CostTracker();