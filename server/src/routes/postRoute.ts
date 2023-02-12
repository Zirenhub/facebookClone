import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import multer from 'multer';
import {
  createPost,
  getPost,
  likePost,
  unlikePost,
} from '../controllers/postController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', jwtAuth, upload.single('image'), createPost);
router.post('/:id/like', jwtAuth, likePost);
router.post('/:id/unlike', jwtAuth, unlikePost);
router.post('/:id/delete'); // delete post

router.get('/:id', jwtAuth, getPost);
// update post ?

export default router;
