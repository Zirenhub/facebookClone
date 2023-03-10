import express from 'express';
import { searchProfile } from '../controllers/searchController';

const router = express.Router();

router.post('/profile/:query', searchProfile);

export default router;
