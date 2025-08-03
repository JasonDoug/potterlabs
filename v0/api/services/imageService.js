import { logger } from '../utils/logger.js';

// Image generation providers configuration
const IMAGE_PROVIDERS = {
  openai_dalle: {
    enabled: !!process.env.OPENAI_API_KEY,
    capabilities: ['high_quality', 'text_to_image', 'style_control'],
    maxImages: 10,
    resolution: '1024x1024',
    processingTime: 3000 // 3 seconds per image
  },
  stability_ai: {
    enabled: !!process.env.STABILITY_API_KEY,
    capabilities: ['ultra_high_quality', 'artistic_styles', 'photorealistic'],
    maxImages: 8,
    resolution: '1536x1024',
    processingTime: 5000 // 5 seconds per image
  },
  midjourney: {
    enabled: !!process.env.MIDJOURNEY_API_KEY,
    capabilities: ['artistic', 'creative', 'unique_styles'],
    maxImages: 6,
    resolution: '1024x1024',
    processingTime: 8000 // 8 seconds per image
  },
  stock_images: {
    enabled: true, // Always available as fallback
    capabilities: ['fast', 'reliable', 'cost_effective'],
    maxImages: 20,
    resolution: '1920x1080',
    processingTime: 500 // 0.5 seconds per image
  }
};

// Style-specific image generation preferences
const STYLE_IMAGE_PREFERENCES = {
  slideshow_modern: {
    providers: ['openai_dalle', 'stability_ai', 'stock_images'],
    imageStyle: 'clean, modern, minimalist photography',
    effects: ['subtle_shadows', 'clean_backgrounds'],
    quality: 'high'
  },
  slideshow_classic: {
    providers: ['stability_ai', 'midjourney', 'openai_dalle', 'stock_images'],
    imageStyle: 'elegant, traditional, professional photography',
    effects: ['warm_tones', 'classic_framing', 'professional_lighting'],
    quality: 'ultra_high'
  }
};

export const getAvailableImageProviders = () => {
  const available = [];
  
  for (const [provider, config] of Object.entries(IMAGE_PROVIDERS)) {
    if (config.enabled) {
      available.push(provider);
    }
  }
  
  logger.info('Available image providers:', available);
  return available;
};

export const selectImageProvider = (style, imageCount = 1) => {
  const availableProviders = getAvailableImageProviders();
  const stylePrefs = STYLE_IMAGE_PREFERENCES[style] || STYLE_IMAGE_PREFERENCES.slideshow_modern;
  
  // Find first available provider from preferences
  for (const preferredProvider of stylePrefs.providers) {
    if (availableProviders.includes(preferredProvider)) {
      const provider = IMAGE_PROVIDERS[preferredProvider];
      
      // Check if provider can handle the image count
      if (imageCount <= provider.maxImages) {
        return {
          provider: preferredProvider,
          config: provider,
          styleConfig: stylePrefs,
          estimatedTime: provider.processingTime * imageCount
        };
      }
    }
  }
  
  // Fallback to stock images
  return {
    provider: 'stock_images',
    config: IMAGE_PROVIDERS.stock_images,
    styleConfig: stylePrefs,
    estimatedTime: IMAGE_PROVIDERS.stock_images.processingTime * imageCount
  };
};

export const generateImagesForSlideshow = async (script, style = 'slideshow_modern') => {
  logger.info('Starting image generation for slideshow', { script: script.title, style });
  
  try {
    // Extract image prompts from script
    const imagePrompts = extractImagePrompts(script, style);
    const imageCount = imagePrompts.length;
    
    // Select appropriate image provider
    const selection = selectImageProvider(style, imageCount);
    logger.info('Selected image provider:', selection.provider);
    
    // Generate images based on provider
    const images = await generateWithImageProvider(imagePrompts, selection);
    
    logger.info(`Generated ${images.length} images for slideshow`);
    return {
      images,
      provider: selection.provider,
      style: selection.styleConfig,
      totalTime: selection.estimatedTime,
      quality: selection.config.resolution
    };
    
  } catch (error) {
    logger.error('Image generation failed:', error);
    throw new Error('Failed to generate images for slideshow');
  }
};

const extractImagePrompts = (script, style) => {
  const styleConfig = STYLE_IMAGE_PREFERENCES[style] || STYLE_IMAGE_PREFERENCES.slideshow_modern;
  const baseStyle = styleConfig.imageStyle;
  
  // Extract key scenes from script segments
  const prompts = script.segments.map((segment, index) => {
    const sceneDescription = extractSceneFromText(segment.text);
    
    return {
      id: `img_${index + 1}`,
      prompt: `${sceneDescription}, ${baseStyle}`,
      duration: segment.duration || 3,
      transition: index === 0 ? 'fade_in' : 'cross_fade',
      effects: styleConfig.effects
    };
  });
  
  // Add title slide if needed
  if (script.title) {
    prompts.unshift({
      id: 'title_slide',
      prompt: `Title slide background for "${script.title}", ${baseStyle}`,
      duration: 2,
      transition: 'fade_in',
      effects: styleConfig.effects,
      isTitle: true
    });
  }
  
  return prompts;
};

const extractSceneFromText = (text) => {
  // Simple scene extraction logic
  const keywords = text.toLowerCase().match(/\b(space|ocean|forest|city|mountain|laboratory|ancient|modern|technology|nature|building|landscape)\b/g);
  
  if (keywords && keywords.length > 0) {
    return `scene showing ${keywords.slice(0, 3).join(', ')}`;
  }
  
  // Fallback to generic scene
  return 'professional scene related to the topic';
};

const generateWithImageProvider = async (prompts, selection) => {
  const { provider, config, styleConfig } = selection;
  
  logger.info(`Generating ${prompts.length} images with ${provider}`);
  
  switch (provider) {
    case 'openai_dalle':
      return await generateWithDALLE(prompts, config, styleConfig);
    case 'stability_ai':
      return await generateWithStabilityAI(prompts, config, styleConfig);
    case 'midjourney':
      return await generateWithMidjourney(prompts, config, styleConfig);
    case 'stock_images':
    default:
      return await generateWithStockImages(prompts, config, styleConfig);
  }
};

const generateWithDALLE = async (prompts, config, styleConfig) => {
  logger.info('Generating images with DALL-E');
  
  // Simulate DALL-E generation
  const images = [];
  
  for (const prompt of prompts) {
    await new Promise(resolve => setTimeout(resolve, config.processingTime));
    
    images.push({
      id: prompt.id,
      url: `https://api.example.com/dalle/image_${prompt.id}_${Date.now()}.png`,
      prompt: prompt.prompt,
      provider: 'openai_dalle',
      resolution: config.resolution,
      duration: prompt.duration,
      transition: prompt.transition,
      effects: prompt.effects,
      isTitle: prompt.isTitle || false,
      metadata: {
        model: 'dall-e-3',
        style: styleConfig.imageStyle,
        quality: 'hd'
      }
    });
  }
  
  return images;
};

const generateWithStabilityAI = async (prompts, config, styleConfig) => {
  logger.info('Generating images with Stability AI');
  
  // Simulate Stability AI generation
  const images = [];
  
  for (const prompt of prompts) {
    await new Promise(resolve => setTimeout(resolve, config.processingTime));
    
    images.push({
      id: prompt.id,
      url: `https://api.example.com/stability/image_${prompt.id}_${Date.now()}.png`,
      prompt: prompt.prompt,
      provider: 'stability_ai',
      resolution: config.resolution,
      duration: prompt.duration,
      transition: prompt.transition,
      effects: prompt.effects,
      isTitle: prompt.isTitle || false,
      metadata: {
        model: 'stable-diffusion-xl',
        style: styleConfig.imageStyle,
        quality: 'ultra_high'
      }
    });
  }
  
  return images;
};

const generateWithMidjourney = async (prompts, config, styleConfig) => {
  logger.info('Generating images with Midjourney');
  
  // Simulate Midjourney generation
  const images = [];
  
  for (const prompt of prompts) {
    await new Promise(resolve => setTimeout(resolve, config.processingTime));
    
    images.push({
      id: prompt.id,
      url: `https://api.example.com/midjourney/image_${prompt.id}_${Date.now()}.png`,
      prompt: prompt.prompt,
      provider: 'midjourney',
      resolution: config.resolution,
      duration: prompt.duration,
      transition: prompt.transition,
      effects: prompt.effects,
      isTitle: prompt.isTitle || false,
      metadata: {
        model: 'midjourney-v6',
        style: styleConfig.imageStyle,
        quality: 'artistic'
      }
    });
  }
  
  return images;
};

const generateWithStockImages = async (prompts, config, styleConfig) => {
  logger.info('Generating slideshow with stock images');
  
  // Simulate stock image selection
  const images = [];
  
  for (const prompt of prompts) {
    await new Promise(resolve => setTimeout(resolve, config.processingTime));
    
    const imageId = Math.random().toString(36).substring(7);
    
    images.push({
      id: prompt.id,
      url: `https://api.example.com/stock/image_${imageId}.jpg`,
      prompt: prompt.prompt,
      provider: 'stock_images',
      resolution: config.resolution,
      duration: prompt.duration,
      transition: prompt.transition,
      effects: prompt.effects,
      isTitle: prompt.isTitle || false,
      metadata: {
        source: 'stock_library',
        style: styleConfig.imageStyle,
        quality: 'standard'
      }
    });
  }
  
  return images;
};

export const getImageProviderCapabilities = () => {
  const capabilities = {};
  
  for (const [provider, config] of Object.entries(IMAGE_PROVIDERS)) {
    if (config.enabled) {
      capabilities[provider] = {
        maxImages: config.maxImages,
        resolution: config.resolution,
        capabilities: config.capabilities,
        estimatedTimePerImage: `${config.processingTime / 1000}s`
      };
    }
  }
  
  return capabilities;
};

// Health check for image providers
export const checkImageProviderHealth = async (provider) => {
  try {
    const config = IMAGE_PROVIDERS[provider];
    if (!config || !config.enabled) {
      return { status: 'unavailable', reason: 'Provider not configured' };
    }
    
    // Simulate health check
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return { 
      status: 'healthy', 
      capabilities: config.capabilities,
      maxImages: config.maxImages 
    };
    
  } catch (error) {
    logger.error(`Image provider ${provider} health check failed:`, error);
    return { status: 'unhealthy', reason: error.message };
  }
};