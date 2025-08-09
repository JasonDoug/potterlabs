import { logger } from '../utils/logger.js';

// Voice provider configuration
const VOICE_PROVIDERS = {
  openai_tts: {
    enabled: !!process.env.OPENAI_API_KEY,
    voices: {
      'alloy': 'alloy',
      'echo': 'echo', 
      'fable': 'fable',
      'onyx': 'onyx',
      'nova': 'nova',
      'shimmer': 'shimmer'
    },
    defaultVoice: 'alloy',
    models: ['tts-1', 'tts-1-hd'],
    formats: ['mp3', 'opus', 'aac', 'flac']
  },
  elevenlabs: {
    enabled: !!process.env.ELEVENLABS_API_KEY,
    voices: {
      'rachel': '21m00Tcm4TlvDq8ikWAM',
      'drew': '29vD33N1CtxCmqQRPOHJ', 
      'clyde': '2EiwWnXFnvU5JabPnv8n',
      'paul': '5Q0t7uMcjvnagumLfvZi',
      'domi': 'AZnzlk1XvdvUeBnXmlld',
      'dave': 'CYw3kZ02Hs0563khs1Fj',
      'fin': 'D38z5RcWu1voky8WS1ja',
      'sarah': 'EXAVITQu4vr4xnSDxMaL'
    },
    defaultVoice: 'rachel',
    models: ['eleven_monolingual_v1', 'eleven_multilingual_v2'],
    formats: ['mp3', 'pcm']
  }
};

export const generateVoice = async (text, voiceId = 'sarah', options = {}) => {
  try {
    logger.info('Generating voice for text:', { textLength: text.length, voiceId });
    
    // Determine provider based on voice ID or availability
    const provider = selectVoiceProvider(voiceId);
    
    switch (provider.name) {
      case 'openai_tts':
        return await generateWithOpenAITTS(text, voiceId, provider, options);
      case 'elevenlabs':
        return await generateWithElevenLabs(text, voiceId, provider, options);
      default:
        return await generateMockVoice(text, voiceId, options);
    }
    
  } catch (error) {
    logger.error('Voice generation failed:', error);
    
    // Fallback to mock voice generation
    try {
      return await generateMockVoice(text, voiceId, options);
    } catch (fallbackError) {
      throw new Error('Failed to generate voice');
    }
  }
};

const selectVoiceProvider = (voiceId) => {
  // Check ElevenLabs first for better quality
  if (VOICE_PROVIDERS.elevenlabs.enabled && VOICE_PROVIDERS.elevenlabs.voices[voiceId]) {
    return {
      name: 'elevenlabs',
      config: VOICE_PROVIDERS.elevenlabs,
      voiceId: VOICE_PROVIDERS.elevenlabs.voices[voiceId]
    };
  }
  
  // Check OpenAI TTS
  if (VOICE_PROVIDERS.openai_tts.enabled && VOICE_PROVIDERS.openai_tts.voices[voiceId]) {
    return {
      name: 'openai_tts',
      config: VOICE_PROVIDERS.openai_tts,
      voiceId: VOICE_PROVIDERS.openai_tts.voices[voiceId]
    };
  }
  
  // Fallback to available provider
  if (VOICE_PROVIDERS.elevenlabs.enabled) {
    return {
      name: 'elevenlabs',
      config: VOICE_PROVIDERS.elevenlabs,
      voiceId: VOICE_PROVIDERS.elevenlabs.voices[VOICE_PROVIDERS.elevenlabs.defaultVoice]
    };
  }
  
  if (VOICE_PROVIDERS.openai_tts.enabled) {
    return {
      name: 'openai_tts',
      config: VOICE_PROVIDERS.openai_tts,
      voiceId: VOICE_PROVIDERS.openai_tts.voices[VOICE_PROVIDERS.openai_tts.defaultVoice]
    };
  }
  
  return { name: 'mock', config: {}, voiceId };
};

const generateWithOpenAITTS = async (text, voiceId, provider, options) => {
  logger.info('Generating voice with OpenAI TTS');
  
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: options.model || 'tts-1',
      input: text,
      voice: provider.voiceId,
      response_format: options.format || 'mp3',
      speed: options.speed || 1.0
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI TTS API error: ${error.error?.message || 'Unknown error'}`);
  }
  
  const audioBuffer = await response.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString('base64');
  const audioUrl = `data:audio/mp3;base64,${audioBase64}`;
  
  return {
    audioUrl,
    duration: estimateAudioDuration(text),
    voiceId: provider.voiceId,
    format: options.format || 'mp3',
    sampleRate: 24000,
    bitrate: 64,
    provider: 'openai_tts',
    size: audioBuffer.byteLength
  };
};

const generateWithElevenLabs = async (text, voiceId, provider, options) => {
  logger.info('Generating voice with ElevenLabs');
  
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${provider.voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text,
      model_id: options.model || 'eleven_monolingual_v1',
      voice_settings: {
        stability: options.stability || 0.5,
        similarity_boost: options.similarity_boost || 0.5,
        style: options.style || 0.0,
        use_speaker_boost: options.use_speaker_boost || true
      }
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`ElevenLabs API error: ${error.detail?.message || 'Unknown error'}`);
  }
  
  const audioBuffer = await response.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString('base64');
  const audioUrl = `data:audio/mp3;base64,${audioBase64}`;
  
  return {
    audioUrl,
    duration: estimateAudioDuration(text),
    voiceId: provider.voiceId,
    format: 'mp3',
    sampleRate: 44100,
    bitrate: 128,
    provider: 'elevenlabs',
    size: audioBuffer.byteLength
  };
};

const generateMockVoice = async (text, voiceId, options) => {
  logger.info('Generating mock voice audio');
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    audioUrl: `https://example.com/audio/${Date.now()}_${voiceId}.mp3`,
    duration: estimateAudioDuration(text),
    voiceId: voiceId,
    format: 'mp3',
    sampleRate: 44100,
    bitrate: 128,
    provider: 'mock'
  };
};

const estimateAudioDuration = (text) => {
  // Estimate: average speaking rate is ~150 words per minute
  const wordCount = text.split(/\s+/).length;
  const duration = Math.max(1, Math.ceil((wordCount / 150) * 60));
  return duration;
};

export const generateVoiceForScript = async (script, voiceId = 'sarah') => {
  try {
    const audioSegments = [];
    
    for (const scene of script.scenes) {
      const audio = await generateVoice(scene.text, voiceId);
      audioSegments.push({
        sceneId: scene.id,
        audioUrl: audio.audioUrl,
        duration: audio.duration,
        text: scene.text
      });
    }
    
    return {
      segments: audioSegments,
      totalDuration: audioSegments.reduce((sum, seg) => sum + seg.duration, 0),
      voiceId: voiceId
    };
    
  } catch (error) {
    logger.error('Script voice generation failed:', error);
    throw new Error('Failed to generate voice for script');
  }
};

// Voice data moved to configService.js
// Use getVoices() from configService instead
