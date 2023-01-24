import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { getProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/:id', jwtAuth, getProfile);

export default router;
