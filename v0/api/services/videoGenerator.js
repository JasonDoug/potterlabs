import fs from 'fs';
import path from 'path';

export async function generateVideo(config) {
  const vid = `mock_vid_${Date.now()}`;
  const output = {
    vid,
    script: "Generated script for: " + (config.prompt || config.topic),
    voice_file: `${vid}_voice.mp3`,
    video_file: `${vid}_video.mp4`,
    status: "complete",
    url: `https://mockcdn.ai/videos/${vid}.mp4`
  };
  const outPath = path.resolve('samples', 'job_output.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  return { vid, status: "processing", message: "Video generation job created." };
}