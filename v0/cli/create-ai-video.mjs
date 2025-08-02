#!/usr/bin/env node

import { intro, select, text, confirm, outro } from '@clack/prompts';
import fs from 'fs';
import path from 'path';

async function main() {
  intro('🎬 Create a new AI video config');

  const style = await select({
    message: 'Choose a visual style:',
    options: [
      { label: 'Cinematic', value: 'cinematic' },
      { label: 'Anime / Cartoon', value: 'anime' },
      { label: 'Photographic', value: 'photographic' },
      { label: 'Pixel Art', value: 'pixel art' },
      { label: 'Watercolor / Line Art', value: 'watercolor' },
      { label: 'Stylized / Neon / Punk', value: 'neon punk' },
      { label: 'Slideshow (Fallback)', value: 'slideshow' },
    ],
  });

  const voice = await select({
    message: 'Choose a voice:',
    options: [
      'Charlie', 'George', 'Callum', 'Sarah', 'Laura', 'Charlotte'
    ].map(v => ({ label: v, value: v }))
  });

  const theme = await select({
    message: 'Choose a caption theme:',
    options: [
      'Hormozi_1', 'Beast', 'Tracy', 'Noah', 'Karl', 'Luke'
    ].map(v => ({ label: v, value: v }))
  });

  const aspectRatio = await select({
    message: 'Choose an aspect ratio:',
    options: ['9:16', '1:1', '16:9'].map(v => ({ label: v, value: v }))
  });

  const duration = await select({
    message: 'Select video duration:',
    options: ['30-60', '60-90', '90-120', '5 min', '10 min'].map(v => ({ label: v, value: v }))
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

  const config = {
    style,
    voice,
    theme,
    aspect_ratio: aspectRatio,
    duration,
    prompt: prompt || undefined,
    include_voiceover: includeVoiceover ? "1" : "0",
    bg_music: includeMusic ? "default" : undefined,
    use_ai: "1",
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
