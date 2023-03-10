import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import multer from 'multer';
import {
  createPost,
  getPost,
  likePost,
  unlikePost,
  deletePost,
  postComment,
  getPostComments,
} from '../controllers/postController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), createPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

router.post('/:id/like', likePost);
router.post('/:id/unlike', unlikePost);

router.post('/:id/comment', postComment);
router.get('/:id/comments', getPostComments);

// update post ?

export default router;
