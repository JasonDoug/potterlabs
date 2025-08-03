import express from 'express';
import { validateApiKey } from '../utils/auth.js';
import { 
  getTopics, 
  getThemes, 
  getVoices, 
  getStyles, 
  getBackgroundMusic 
} from '../services/configService.js';

const router = express.Router();

// Apply API key validation to all routes
router.use(validateApiKey);

// Get available topics
router.get('/topics', (req, res) => {
  const topics = getTopics();
  res.json({ topics });
});

// Get available themes
router.get('/themes', (req, res) => {
  const themes = getThemes();
  res.json({ themes });
});

// Get available voices
router.get('/voices', (req, res) => {
  const voices = getVoices();
  res.json({ voices });
});

// Get available styles
router.get('/styles', (req, res) => {
  const styles = getStyles();
  res.json({ styles });
});

// Get background music options
router.get('/background-music', (req, res) => {
  const music = getBackgroundMusic();
  res.json({ music });
});

export default router;