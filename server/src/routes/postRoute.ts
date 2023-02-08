import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import multer from 'multer';
import { createPost, getPost } from '../controllers/postController';

const router = express.Router();
const upload = multer();

router.post('/', jwtAuth, upload.single('image'), createPost);
router.get('/:id', jwtAuth, getPost);

// update post ?

router.post('/:id/delete'); // delete post

export default router;
