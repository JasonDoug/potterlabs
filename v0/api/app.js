import express from 'express';
import cors from 'cors';

import videoRoutes from './routes/video.js';
import { authMiddleware } from './utils/auth.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(authMiddleware);

app.use('/video', videoRoutes);

export default app;