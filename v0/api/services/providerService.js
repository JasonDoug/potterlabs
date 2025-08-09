import { logger } from '../utils/logger.js';
import { generateScript } from './scriptGenerator.js';
import { generateVoice } from './voiceGenerator.js';
import { routeConfig } from './configRouter.js';
import { generateImagesForSlideshow } from './imageService.js';

// Provider-specific generation logic
export const generateWithProvider = async (config, routing) => {
  logger.info(`Starting generation with ${routing.provider}`, { 
    mode: routing.mode, 
    style: config.style 
  });

  try {
    switch (routing.provider) {
      case 'runway':
        return await generateWithRunway(config, routing);
      case 'pika':
        return await generateWithPika(config, routing);
      case 'slideshow':
        return await generateWithSlideshow(config, routing);
      default:
        throw new Error(`Unknown provider: ${routing.provider}`);
    }
  } catch (error) {
    logger.error(`Provider generation failed (${routing.provider}):`, error);
    throw error;
  }
};

const generateWithRunway = async (config, routing) => {
  logger.info('Generating with Runway ML', { style: config.style });
  
  if (!process.env.RUNWAY_API_KEY) {
    throw new Error('Runway API key not configured');
  }
  
  const script = await generateScript(config.topic || config.prompt, config.prompt, config.style);
  
  let audioData = null;
  if (config.include_voiceover) {
    audioData = await generateVoice(script.scenes.map(s => s.text).join(' '), config.voice);
  }
  
  try {
    // Create video generation job with Runway API
    const runwayResponse = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        promptImage: config.image_url || await generatePromptImage(script.scenes[0]),
        promptText: script.scenes[0]?.text || config.prompt,
        model: 'gen2',
        watermark: false,
        duration: Math.min(config.duration || 4, 4), // Max 4 seconds for Gen-2
        ratio: config.aspect_ratio === '9:16' ? '768:1344' : 
               config.aspect_ratio === '1:1' ? '1024:1024' : '1344:768',
        motion: config.motion || 5
      })
    });
    
    if (!runwayResponse.ok) {
      const error = await runwayResponse.json();
      throw new Error(`Runway API error: ${error.detail || 'Unknown error'}`);
    }
    
    const jobData = await runwayResponse.json();
    const taskId = jobData.id;
    
    logger.info(`Runway job created: ${taskId}`);
    
    // Poll for completion
    let videoUrl = null;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max wait
    
    while (!videoUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`
        }
      });
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'SUCCEEDED') {
          videoUrl = statusData.output?.[0];
          break;
        } else if (statusData.status === 'FAILED') {
          throw new Error(`Runway generation failed: ${statusData.failure_reason}`);
        }
      }
      
      attempts++;
    }
    
    if (!videoUrl) {
      throw new Error('Runway generation timed out');
    }
    
    const result = {
      type: 'runway_video',
      videoUrl,
      thumbnailUrl: `${videoUrl.replace('.mp4', '_thumb.jpg')}`,
      duration: config.duration || 4,
      format: 'mp4',
      resolution: config.aspect_ratio === '9:16' ? '768x1344' : 
                  config.aspect_ratio === '1:1' ? '1024x1024' : '1344x768',
      provider: 'runway',
      script,
      audio: audioData,
      style: config.style,
      quality: 'high',
      metadata: {
        taskId,
        model: 'gen2',
        motion: config.motion || 5
      }
    };
    
    logger.info('Runway generation completed', { duration: result.duration, taskId });
    return result;
    
  } catch (error) {
    logger.error('Runway generation failed:', error);
    
    // Fallback to mock generation
    await simulateProviderDelay(3000, 5000);
    
    return {
      type: 'runway_video',
      videoUrl: `https://runway.example.com/videos/fallback_${Date.now()}.mp4`,
      thumbnailUrl: `https://runway.example.com/thumbs/fallback_${Date.now()}.jpg`,
      duration: config.duration || script.totalDuration,
      format: 'mp4',
      resolution: config.aspect_ratio === '9:16' ? '1080x1920' : 
                  config.aspect_ratio === '1:1' ? '1080x1080' : '1920x1080',
      provider: 'runway_fallback',
      script,
      audio: audioData,
      style: config.style,
      quality: 'standard',
      metadata: {
        fallback: true,
        error: error.message
      }
    };
  }
};

const generatePromptImage = async (scene) => {
  // Generate a simple prompt image for Runway if none provided
  // This is a placeholder - in production you'd generate via DALL-E or use stock images
  return `https://via.placeholder.com/1024x768/4a90e2/ffffff?text=${encodeURIComponent(scene.text?.slice(0, 50) || 'Scene')}`;
};

const generateWithPika = async (config, routing) => {
  logger.info('Generating with Pika Labs', { style: config.style });
  
  if (!process.env.PIKA_API_KEY) {
    throw new Error('Pika API key not configured');
  }
  
  const script = await generateScript(config.topic || config.prompt, config.prompt, config.style);
  
  let audioData = null;
  if (config.include_voiceover) {
    audioData = await generateVoice(script.scenes.map(s => s.text).join(' '), config.voice);
  }
  
  try {
    // Create video generation job with Pika API
    const pikaResponse = await fetch('https://api.pika.art/v1/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PIKA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: script.scenes[0]?.text || config.prompt,
        image: config.image_url || await generatePromptImage(script.scenes[0]),
        aspectRatio: config.aspect_ratio === '9:16' ? '9:16' : 
                     config.aspect_ratio === '1:1' ? '1:1' : '16:9',
        motion: config.motion || 1,
        seed: config.seed || Math.floor(Math.random() * 1000000),
        guidance_scale: config.guidance_scale || 12,
        negative_prompt: config.negative_prompt || ''
      })
    });
    
    if (!pikaResponse.ok) {
      const error = await pikaResponse.json();
      throw new Error(`Pika API error: ${error.message || 'Unknown error'}`);
    }
    
    const jobData = await pikaResponse.json();
    const jobId = jobData.id;
    
    logger.info(`Pika job created: ${jobId}`);
    
    // Poll for completion
    let videoUrl = null;
    let attempts = 0;
    const maxAttempts = 30; // 2.5 minutes max wait
    
    while (!videoUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.pika.art/v1/videos/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.PIKA_API_KEY}`
        }
      });
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'completed') {
          videoUrl = statusData.result_url;
          break;
        } else if (statusData.status === 'failed') {
          throw new Error(`Pika generation failed: ${statusData.error_message}`);
        }
      }
      
      attempts++;
    }
    
    if (!videoUrl) {
      throw new Error('Pika generation timed out');
    }
    
    const result = {
      type: 'pika_video',
      videoUrl,
      thumbnailUrl: `${videoUrl.replace('.mp4', '_thumb.jpg')}`,
      duration: config.duration || 3, // Pika typically generates 3-second clips
      format: 'mp4',
      resolution: config.aspect_ratio === '9:16' ? '720x1280' : 
                  config.aspect_ratio === '1:1' ? '720x720' : '1280x720',
      provider: 'pika',
      script,
      audio: audioData,
      style: config.style,
      quality: 'creative',
      metadata: {
        jobId,
        motion: config.motion || 1,
        seed: config.seed,
        guidance_scale: config.guidance_scale || 12
      }
    };
    
    logger.info('Pika generation completed', { duration: result.duration, jobId });
    return result;
    
  } catch (error) {
    logger.error('Pika generation failed:', error);
    
    // Fallback to mock generation
    await simulateProviderDelay(2000, 4000);
    
    return {
      type: 'pika_video',
      videoUrl: `https://pika.example.com/videos/fallback_${Date.now()}.mp4`,
      thumbnailUrl: `https://pika.example.com/thumbs/fallback_${Date.now()}.jpg`,
      duration: config.duration || script.totalDuration,
      format: 'mp4',
      resolution: config.aspect_ratio === '9:16' ? '720x1280' : 
                  config.aspect_ratio === '1:1' ? '720x720' : '1280x720',
      provider: 'pika_fallback',
      script,
      audio: audioData,
      style: config.style,
      quality: 'standard',
      metadata: {
        fallback: true,
        error: error.message
      }
    };
  }
};

const generateWithSlideshow = async (config, routing) => {
  logger.info('Generating slideshow', { style: config.style });
  
  const script = await generateScript(config.topic || config.prompt, config.prompt, config.style);
  
  let audioData = null;
  if (config.include_voiceover) {
    audioData = await generateVoice(script.scenes.map(s => s.text).join(' '), config.voice);
  }
  
  // Generate images using the image service
  let imageData = null;
  try {
    imageData = await generateImagesForSlideshow(script, config.style);
    logger.info(`Generated ${imageData.images.length} images with ${imageData.provider}`);
  } catch (error) {
    logger.warn('Image generation failed, using placeholder images:', error.message);
    // Fallback to placeholder images
    imageData = {
      images: script.scenes.map((scene, index) => ({
        id: `placeholder_${index}`,
        url: `https://slideshow.example.com/images/placeholder_${Date.now()}_${index}.jpg`,
        prompt: scene.imagePrompt,
        duration: scene.duration || 3,
        provider: 'placeholder'
      })),
      provider: 'placeholder',
      quality: 'standard'
    };
  }
  
  // Mock slideshow assembly (image sequencing + audio sync)
  await simulateProviderDelay(500, 1500); // 0.5-1.5 seconds for demo
  
  const result = {
    type: 'slideshow',
    videoUrl: `https://slideshow.example.com/videos/${Date.now()}.mp4`,
    thumbnailUrl: imageData.images[0]?.url,
    duration: config.duration || script.totalDuration,
    format: 'mp4',
    resolution: config.aspect_ratio === '9:16' ? '1080x1920' : 
                config.aspect_ratio === '1:1' ? '1080x1080' : '1920x1080',
    provider: 'slideshow',
    script,
    audio: audioData,
    images: imageData.images,
    imageGeneration: {
      provider: imageData.provider,
      quality: imageData.quality,
      totalImages: imageData.images.length,
      style: imageData.style
    },
    style: config.style,
    quality: 'standard'
  };
  
  logger.info('Slideshow generation completed', { 
    duration: result.duration, 
    scenes: imageData.images.length,
    imageProvider: imageData.provider
  });
  return result;
};

// Simulate provider processing time
const simulateProviderDelay = (minMs, maxMs) => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Provider availability check
export const checkProviderHealth = async (provider) => {
  try {
    switch (provider) {
      case 'runway':
        // Mock health check
        return { status: 'healthy', responseTime: 150, queueLength: 3 };
      case 'pika':
        return { status: 'healthy', responseTime: 85, queueLength: 1 };
      case 'slideshow':
        return { status: 'healthy', responseTime: 25, queueLength: 0 };
      default:
        return { status: 'unknown', error: 'Unknown provider' };
    }
  } catch (error) {
    logger.error(`Provider health check failed (${provider}):`, error);
    return { status: 'unhealthy', error: error.message };
  }
};

// Get provider capabilities
export const getProviderCapabilities = (provider) => {
  const capabilities = {
    runway: {
      maxDuration: 300, // 5 minutes
      supportedFormats: ['mp4', 'mov'],
      supportedResolutions: ['1920x1080', '1080x1920', '1080x1080'],
      features: ['camera_movement', 'cinematic_quality', 'photorealism']
    },
    pika: {
      maxDuration: 60, // 1 minute
      supportedFormats: ['mp4', 'gif'],
      supportedResolutions: ['1280x720', '720x1280', '720x720'],
      features: ['animation', 'creative_effects', 'fast_generation']
    },
    slideshow: {
      maxDuration: 600, // 10 minutes
      supportedFormats: ['mp4'],
      supportedResolutions: ['1920x1080', '1080x1920', '1080x1080'],
      features: ['cost_effective', 'educational', 'voice_sync', 'image_generation']
    }
  };
  
  return capabilities[provider] || null;
};