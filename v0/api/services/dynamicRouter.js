import { logger } from '../utils/logger.js';
import { checkProviderHealth } from './providerService.js';

// Provider availability configuration
const PROVIDER_CONFIG = {
  runway: {
    enabled: !!process.env.RUNWAY_API_KEY,
    strengths: ['cinematic', 'photorealistic', 'documentary', 'corporate'],
    fallbacks: ['gemini_veo', 'slideshow']
  },
  gemini_veo: {
    enabled: !!process.env.GEMINI_API_KEY,
    strengths: ['animation', 'artistic', 'abstract', 'creative'],
    fallbacks: ['runway', 'slideshow']
  },
  slideshow: {
    enabled: true, // Always available
    strengths: ['educational', 'presentation', 'cost_effective'],
    fallbacks: [],
    imageGeneration: true
  }
};

// Style preference matrix
const STYLE_PREFERENCES = {
  // Realistic/Professional styles
  'cinematic': ['runway', 'gemini_veo', 'slideshow'],
  'photorealistic': ['runway', 'gemini_veo', 'slideshow'],
  'documentary': ['runway', 'slideshow', 'gemini_veo'],
  
  // Creative/Artistic styles
  'animation': ['gemini_veo', 'runway', 'slideshow'],
  'artistic': ['gemini_veo', 'runway', 'slideshow'],
  'abstract': ['gemini_veo', 'runway', 'slideshow'],
  
  // Slideshow styles (always use slideshow)
  'slideshow_modern': ['slideshow'],
  'slideshow_classic': ['slideshow']
};

// Content type preferences
const CONTENT_PREFERENCES = {
  'educational': ['slideshow', 'runway', 'gemini_veo'],
  'entertainment': ['gemini_veo', 'runway', 'slideshow'],
  'corporate': ['runway', 'slideshow', 'gemini_veo'],
  'creative': ['gemini_veo', 'runway', 'slideshow']
};

export const getAvailableProviders = async () => {
  const available = [];
  
  for (const [provider, config] of Object.entries(PROVIDER_CONFIG)) {
    if (config.enabled) {
      try {
        const health = await checkProviderHealth(provider);
        if (health.status === 'healthy') {
          available.push(provider);
        }
      } catch (error) {
        logger.warn(`Provider ${provider} health check failed:`, error.message);
      }
    }
  }
  
  logger.info('Available providers:', available);
  return available;
};

export const dynamicRouteConfig = async (style, options = {}) => {
  const { topic, duration, contentType } = options;
  const availableProviders = await getAvailableProviders();
  
  if (availableProviders.length === 0) {
    throw new Error('No providers available');
  }
  
  // Get provider preferences for this style
  const stylePreferences = STYLE_PREFERENCES[style] || ['runway', 'gemini_veo', 'slideshow'];
  
  // Find first available provider from preferences
  let selectedProvider = null;
  let reason = '';
  
  for (const preferredProvider of stylePreferences) {
    if (availableProviders.includes(preferredProvider)) {
      selectedProvider = preferredProvider;
      reason = getProviderReason(preferredProvider, style, options);
      break;
    }
  }
  
  // Fallback to any available provider
  if (!selectedProvider) {
    selectedProvider = availableProviders[0];
    reason = `Fallback to ${selectedProvider} (only available provider)`;
  }
  
  // Apply content-based routing if specified
  if (contentType && CONTENT_PREFERENCES[contentType]) {
    const contentPrefs = CONTENT_PREFERENCES[contentType];
    for (const provider of contentPrefs) {
      if (availableProviders.includes(provider)) {
        selectedProvider = provider;
        reason = `Content-optimized routing: ${contentType} works best with ${provider}`;
        break;
      }
    }
  }
  
  // Apply duration-based optimizations
  if (duration) {
    if (duration <= 30 && availableProviders.includes('gemini_veo')) {
      selectedProvider = 'gemini_veo';
      reason = 'Short duration optimized for Gemini Veo fast generation';
    } else if (duration > 120 && availableProviders.includes('slideshow')) {
      selectedProvider = 'slideshow';
      reason = 'Long duration optimized for cost-effective slideshow';
    }
  }
  
  const mode = selectedProvider === 'slideshow' ? 'slideshow' : 'ai_generated';
  
  logger.info(`Dynamic routing: ${style} → ${selectedProvider}`, { reason, availableProviders });
  
  return {
    provider: selectedProvider,
    mode,
    reason,
    availableProviders,
    adaptiveRouting: true
  };
};

const getProviderReason = (provider, style, options) => {
  const reasons = {
    runway: {
      cinematic: "Runway ML excels at cinematic, professional video quality",
      photorealistic: "Runway ML provides the most realistic AI-generated content",
      documentary: "Runway ML is ideal for serious, documentary-style content",
      default: "Runway ML provides high-quality AI video generation"
    },
    gemini_veo: {
      animation: "Gemini Veo 3 specializes in animated and creative content",
      artistic: "Gemini Veo 3 handles artistic and experimental styles excellently",
      abstract: "Gemini Veo 3 excels at abstract and non-realistic content",
      default: "Gemini Veo 3 provides creative AI video generation"
    },
    slideshow: {
      educational: "Slideshow format is most effective for educational content",
      presentation: "Slideshow provides cost-effective presentation format",
      default: "Slideshow offers reliable, cost-effective video generation"
    }
  };
  
  return reasons[provider]?.[style] || reasons[provider]?.default || `Using ${provider} for ${style} style`;
};

export const getProviderCapabilities = async () => {
  const availableProviders = await getAvailableProviders();
  const capabilities = {};
  
  for (const provider of availableProviders) {
    capabilities[provider] = {
      enabled: true,
      strengths: PROVIDER_CONFIG[provider]?.strengths || [],
      ...getProviderSpecs(provider)
    };
  }
  
  return capabilities;
};

const getProviderSpecs = (provider) => {
  const specs = {
    runway: {
      maxDuration: 300,
      estimatedTime: '3-8 minutes',
      quality: 'high',
      resolutions: ['1920x1080', '1080x1920', '1080x1080'],
      features: ['cinematic_quality', 'camera_movements', 'photorealism']
    },
    gemini_veo: {
      maxDuration: 120,
      estimatedTime: '1-4 minutes',
      quality: 'creative',
      resolutions: ['1280x720', '720x1280', '1080x1080'],
      features: ['animation', 'creative_effects', 'artistic_styles']
    },
    slideshow: {
      maxDuration: 600,
      estimatedTime: '30-60 seconds',
      quality: 'standard',
      resolutions: ['1920x1080', '1080x1920', '1080x1080'],
      features: ['cost_effective', 'educational', 'voice_sync', 'fast_generation', 'image_generation']
    }
  };
  
  return specs[provider] || {};
};

// Graceful degradation strategies
export const getStyleAdaptations = (originalStyle, targetProvider) => {
  const adaptations = {
    // When routing cinematic to non-Runway providers
    cinematic: {
      gemini_veo: {
        prompt_enhancement: "cinematic style with dramatic camera angles and professional lighting",
        duration_adjustment: "Consider shorter duration for optimal quality"
      },
      slideshow: {
        image_style: "cinematic photography style with dramatic lighting",
        transition_effects: "Use cross-fades and professional transitions"
      }
    },
    
    // When routing animation to non-Gemini providers
    animation: {
      runway: {
        prompt_enhancement: "animated style with smooth motion and cartoon-like elements",
        style_note: "May be more realistic than pure animation"
      },
      slideshow: {
        image_style: "cartoon and animated illustration style",
        sequence_timing: "Use quick transitions to simulate animation"
      }
    },
    
    // When routing photorealistic to non-Runway providers
    photorealistic: {
      gemini_veo: {
        prompt_enhancement: "photorealistic and highly detailed visual style",
        quality_note: "May have more creative interpretation"
      },
      slideshow: {
        image_style: "high-quality photography and realistic images",
        selection_criteria: "Use only photographic, non-illustrated content"
      }
    }
  };
  
  return adaptations[originalStyle]?.[targetProvider] || {};
};

// Provider failure recovery
export const handleProviderFailure = async (failedProvider, originalConfig) => {
  logger.warn(`Provider ${failedProvider} failed, attempting recovery`);
  
  const availableProviders = await getAvailableProviders();
  const remainingProviders = availableProviders.filter(p => p !== failedProvider);
  
  if (remainingProviders.length === 0) {
    throw new Error('All providers unavailable');
  }
  
  // Try to find a suitable fallback
  const fallbacks = PROVIDER_CONFIG[failedProvider]?.fallbacks || [];
  
  for (const fallback of fallbacks) {
    if (remainingProviders.includes(fallback)) {
      const adaptations = getStyleAdaptations(originalConfig.style, fallback);
      
      return {
        provider: fallback,
        mode: fallback === 'slideshow' ? 'slideshow' : 'ai_generated',
        reason: `Failover from ${failedProvider} to ${fallback}`,
        adaptations,
        isFailover: true
      };
    }
  }
  
  // Last resort: use any available provider
  const lastResort = remainingProviders[0];
  return {
    provider: lastResort,
    mode: lastResort === 'slideshow' ? 'slideshow' : 'ai_generated',
    reason: `Emergency failover to ${lastResort}`,
    isFailover: true
  };
};