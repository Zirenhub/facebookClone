import express from 'express';
import {
  likeComment,
  unlikeComment,
  replyToComment,
} from '../controllers/commentController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.post('/:id/like', jwtAuth, likeComment);
router.post('/:id/unlike', jwtAuth, unlikeComment);
router.post('/:id/reply', jwtAuth, replyToComment);

export default router;
