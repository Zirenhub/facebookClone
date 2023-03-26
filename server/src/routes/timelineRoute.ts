import express from 'express';
import { getTimeline } from '../controllers/timelineController';

const router = express.Router();

router.get('/', getTimeline);

export default router;
