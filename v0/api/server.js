// Server entry
import dotenv from 'dotenv';
import app from './app.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`AI Story API server running on port ${PORT}`);
});