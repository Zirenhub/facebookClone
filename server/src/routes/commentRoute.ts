import express from 'express';
import {
  likeComment,
  unlikeComment,
  replyToComment,
  getReplies,
} from '../controllers/commentController';

const router = express.Router();

router.post('/:id/like', likeComment);
router.post('/:id/unlike', unlikeComment);
router.post('/:id/reply', replyToComment);
router.get('/:id/replies', getReplies);

export default router;
