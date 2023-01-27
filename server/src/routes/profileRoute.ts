import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getProfile,
  followProfile,
  followersProfile,
} from '../controllers/profileController';

const router = express.Router();

router.get('/:id', jwtAuth, getProfile);
router.get('/:id/follow', jwtAuth, followProfile);
router.get('/:id/followers', jwtAuth, followersProfile);

export default router;
