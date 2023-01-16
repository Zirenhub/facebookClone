import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { createPost, getPost } from '../controllers/postController';

const router = express.Router();

router.post('/', jwtAuth, createPost);
router.get('/:id', jwtAuth, getPost);

// update post ?

router.post('/delete/:id'); // delete post

export default router;
