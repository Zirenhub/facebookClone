import express from 'express';
import { getTimeline } from '../controllers/timelineController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.get('/', jwtAuth, getTimeline);

export default router;
