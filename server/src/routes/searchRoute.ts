import express from 'express';
import { searchProfile } from '../controllers/searchController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.post('/profile/:query', jwtAuth, searchProfile);

export default router;
