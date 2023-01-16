import express from 'express';
import { login, me, signup } from '../controllers/authController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', jwtAuth, me);

export default router;
