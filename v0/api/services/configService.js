import { logger } from '../utils/logger.js';

// Centralized configuration data
const CONFIG_DATA = {
  topics: [
    { id: 'history', name: 'History', description: 'Historical events and figures' },
    { id: 'science', name: 'Science', description: 'Scientific discoveries and concepts' },
    { id: 'technology', name: 'Technology', description: 'Tech innovations and trends' },
    { id: 'nature', name: 'Nature', description: 'Wildlife and natural phenomena' },
    { id: 'space', name: 'Space', description: 'Astronomy and space exploration' },
    { id: 'custom', name: 'Custom', description: 'Custom story from your prompt' }
  ],

  themes: [
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary styling' },
    { id: 'classic', name: 'Classic', description: 'Traditional, elegant styling' },
    { id: 'bold', name: 'Bold', description: 'High contrast, vibrant colors' },
    { id: 'minimal', name: 'Minimal', description: 'Simple, clean design' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-style presentation' }
  ],

  voices: [
    { id: 'sarah', name: 'Sarah', gender: 'female', accent: 'american', description: 'Professional female voice' },
    { id: 'mike', name: 'Mike', gender: 'male', accent: 'american', description: 'Confident male voice' },
    { id: 'emma', name: 'Emma', gender: 'female', accent: 'british', description: 'British female voice' },
    { id: 'james', name: 'James', gender: 'male', accent: 'british', description: 'British male voice' },
    { id: 'maria', name: 'Maria', gender: 'female', accent: 'spanish', description: 'Spanish accent female voice' }
  ],

  styles: [
    { id: 'photorealistic', name: 'Photorealistic', mode: 'ai_generated', description: 'Realistic AI-generated visuals' },
    { id: 'cinematic', name: 'Cinematic', mode: 'ai_generated', description: 'Movie-style AI visuals' },
    { id: 'animation', name: 'Animation', mode: 'ai_generated', description: 'Animated AI-generated content' },
    { id: 'artistic', name: 'Artistic', mode: 'ai_generated', description: 'Creative and experimental styles' },
    { id: 'abstract', name: 'Abstract', mode: 'ai_generated', description: 'Non-realistic, creative content' },
    { id: 'documentary', name: 'Documentary', mode: 'ai_generated', description: 'Serious, realistic documentary style' },
    { id: 'slideshow_modern', name: 'Modern Slideshow', mode: 'slideshow', description: 'Clean slideshow with images' },
    { id: 'slideshow_classic', name: 'Classic Slideshow', mode: 'slideshow', description: 'Traditional slideshow format' }
  ],

  backgroundMusic: [
    { id: 'ambient1', name: 'Gentle Ambient', genre: 'ambient', duration: 180, mood: 'calm' },
    { id: 'upbeat1', name: 'Uplifting Corporate', genre: 'corporate', duration: 150, mood: 'energetic' },
    { id: 'dramatic1', name: 'Dramatic Orchestral', genre: 'orchestral', duration: 200, mood: 'dramatic' },
    { id: 'tech1', name: 'Tech Innovation', genre: 'electronic', duration: 160, mood: 'modern' },
    { id: 'nature1', name: 'Nature Sounds', genre: 'ambient', duration: 300, mood: 'peaceful' }
  ]
};

export const getTopics = () => {
  logger.debug('Retrieved topics configuration');
  return CONFIG_DATA.topics;
};

export const getThemes = () => {
  logger.debug('Retrieved themes configuration');
  return CONFIG_DATA.themes;
};

export const getVoices = () => {
  logger.debug('Retrieved voices configuration');
  return CONFIG_DATA.voices;
};

export const getStyles = () => {
  logger.debug('Retrieved styles configuration');
  return CONFIG_DATA.styles;
};

export const getBackgroundMusic = () => {
  logger.debug('Retrieved background music configuration');
  return CONFIG_DATA.backgroundMusic;
};

export const getVoiceById = (voiceId) => {
  const voice = CONFIG_DATA.voices.find(v => v.id === voiceId);
  if (!voice) {
    logger.warn(`Voice not found: ${voiceId}`);
    return CONFIG_DATA.voices[0]; // Default to first voice
  }
  return voice;
};

export const getStyleById = (styleId) => {
  const style = CONFIG_DATA.styles.find(s => s.id === styleId);
  if (!style) {
    logger.warn(`Style not found: ${styleId}`);
    return CONFIG_DATA.styles[0]; // Default to first style
  }
  return style;
};

export const getTopicById = (topicId) => {
  const topic = CONFIG_DATA.topics.find(t => t.id === topicId);
  if (!topic) {
    logger.warn(`Topic not found: ${topicId}`);
    return CONFIG_DATA.topics[CONFIG_DATA.topics.length - 1]; // Default to 'custom'
  }
  return topic;
};

export const validateConfig = (config) => {
  const errors = [];
  
  if (!config.topic && !config.prompt) {
    errors.push('Either topic or prompt is required');
  }
  
  if (!config.style) {
    errors.push('Style is required');
  }
  
  if (config.style && !getStyleById(config.style)) {
    errors.push(`Invalid style: ${config.style}`);
  }
  
  if (config.voice && !getVoiceById(config.voice)) {
    errors.push(`Invalid voice: ${config.voice}`);
  }
  
  if (config.topic && !getTopicById(config.topic)) {
    errors.push(`Invalid topic: ${config.topic}`);
  }
  
  return errors;
};