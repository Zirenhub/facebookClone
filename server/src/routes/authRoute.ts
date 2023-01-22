import express from 'express';
import { login, logout, me, signup } from '../controllers/authController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', jwtAuth, me);
router.get('/logout', jwtAuth, logout);

export default router;
