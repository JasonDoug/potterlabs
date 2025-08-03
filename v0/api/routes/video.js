import { Router } from 'express';
import fs from 'fs';
import path from 'path';

import { generateVideo } from '../services/videoGenerator.js';

const router = Router();

const topics = ['Custom', 'History', 'Science', 'Art'];
const themes = ['Hormozi_1', 'Beast', 'Tracy', 'Noah', 'Karl', 'Luke'];
const voices = ['Charlie', 'George', 'Callum', 'Sarah', 'Laura', 'Charlotte'];
const styles = ['cinematic', 'anime', 'photographic', 'pixel art', 'watercolor', 'neon punk', 'slideshow'];
const music = ['default', 'ambient', 'dramatic'];

router.post('/generate', async (req, res) => {
  try {
    const result = await generateVideo(req.body || {});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

router.get('/topics', (_req, res) => res.json(topics));
router.get('/themes', (_req, res) => res.json(themes));
router.get('/voices', (_req, res) => res.json(voices));
router.get('/styles', (_req, res) => res.json(styles));
router.get('/background-music', (_req, res) => res.json(music));

router.get('/url', (req, res) => {
  const { id } = req.query;
  const outPath = path.resolve('..', 'samples', 'job_output.json');
  if (id && fs.existsSync(outPath)) {
    const data = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
    if (data.vid === id) {
      return res.json(data);
    }
  }
  return res.json({ vid: id, status: 'processing' });
});

export default router;
