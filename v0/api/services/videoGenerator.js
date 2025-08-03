import fs from 'fs';
import path from 'path';

import { generateScript } from './scriptGenerator.js';
import { synthesizeVoice } from './voiceGenerator.js';
import { routeConfig } from './configRouter.js';

export async function generateVideo(config) {
  const vid = `mock_vid_${Date.now()}`;
  const script = await generateScript(config.prompt || config.topic);
  const voice_file = await synthesizeVoice(script, config.voice);
  const mode = routeConfig(config.style);

  const output = {
    vid,
    script,
    voice_file,
    video_file: `${vid}_video.mp4`,
    status: 'complete',
    url: `https://mockcdn.ai/videos/${vid}.mp4`,
    mode,
  };

  const outPath = path.resolve('..', 'samples', 'job_output.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

  return { vid, status: 'processing', message: 'Video generation job created.' };
}
