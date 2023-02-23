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

router.post('/', jwtAuth, upload.single('image'), createPost);
router.get('/:id', jwtAuth, getPost);
router.delete('/:id', jwtAuth, deletePost);

router.post('/:id/like', jwtAuth, likePost);
router.post('/:id/unlike', jwtAuth, unlikePost);

router.post('/:id/comment', jwtAuth, postComment);
router.get('/:id/comments', jwtAuth, getPostComments);
// update post ?

export default router;
