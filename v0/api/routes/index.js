import express from 'express';
import generateRoutes from './generate.js';
import statusRoutes from './status.js';
import configRoutes from './config.js';

const router = express.Router();

// Mount route modules
router.use('/generate', generateRoutes);
router.use('/status', statusRoutes);
router.use('/', configRoutes);

export default router;