#!/usr/bin/env node

import { intro, select, text, confirm, outro } from '@clack/prompts';
import fs from 'fs';
import path from 'path';

async function main() {
  intro('🎬 Create a new AI video config');

  const style = await select({
    message: 'Choose a visual style:',
    options: [
      { label: 'Cinematic (Runway)', value: 'cinematic' },
      { label: 'Photorealistic (Runway)', value: 'photorealistic' },
      { label: 'Animation (Pika)', value: 'animation' },
      { label: 'Artistic (Pika)', value: 'artistic' },
      { label: 'Abstract (Pika)', value: 'abstract' },
      { label: 'Documentary (Runway)', value: 'documentary' },
      { label: 'Modern Slideshow', value: 'slideshow_modern' },
      { label: 'Classic Slideshow', value: 'slideshow_classic' },
    ],
  });

  const voice = await select({
    message: 'Choose a voice:',
    options: [
      { label: 'Sarah (American Female)', value: 'sarah' },
      { label: 'Mike (American Male)', value: 'mike' },
      { label: 'Emma (British Female)', value: 'emma' },
      { label: 'James (British Male)', value: 'james' },
      { label: 'Maria (Spanish Female)', value: 'maria' }
    ]
  });

  const theme = await select({
    message: 'Choose a caption theme:',
    options: [
      { label: 'Modern', value: 'modern' },
      { label: 'Classic', value: 'classic' },
      { label: 'Bold', value: 'bold' },
      { label: 'Minimal', value: 'minimal' },
      { label: 'Cinematic', value: 'cinematic' }
    ]
  });

  const aspectRatio = await select({
    message: 'Choose an aspect ratio:',
    options: ['9:16', '1:1', '16:9'].map(v => ({ label: v, value: v }))
  });

  const duration = await select({
    message: 'Select video duration:',
    options: [
      { label: '15 seconds (Pika optimized)', value: 15 },
      { label: '30 seconds (Short)', value: 30 },
      { label: '60 seconds (Medium)', value: 60 },
      { label: '120 seconds (Long)', value: 120 },
      { label: '300 seconds (Extended)', value: 300 }
    ]
  });

  const prompt = await text({
    message: 'Enter a custom script prompt (leave blank to skip):',
    placeholder: 'e.g. "A robot tells a bedtime story..."'
  });

  const includeVoiceover = await confirm({
    message: 'Include voiceover?'
  });

  const includeMusic = await confirm({
    message: 'Include background music?'
  });

  // Add topic selection for better routing
  const topic = await select({
    message: 'Choose a content category:',
    options: [
      { label: 'History', value: 'history' },
      { label: 'Science', value: 'science' },
      { label: 'Technology', value: 'technology' },
      { label: 'Nature', value: 'nature' },
      { label: 'Space', value: 'space' },
      { label: 'Custom', value: 'custom' }
    ]
  });

  const config = {
    topic,
    prompt: prompt || undefined,
    style,
    voice,
    theme,
    duration,
    aspect_ratio: aspectRatio,
    include_voiceover: includeVoiceover,
    bg_music: includeMusic ? "default" : undefined,
    language: "English"
  };

  const outputPath = path.join(process.cwd(), 'video-config.json');
  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));

  outro(`✅ Config saved to ${outputPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
