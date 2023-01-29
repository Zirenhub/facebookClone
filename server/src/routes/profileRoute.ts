import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getProfile,
  sendRequest,
  getRequests,
} from '../controllers/profileController';

const router = express.Router();

router.post('/:id/sendRequest', jwtAuth, sendRequest);
router.get('/requests', jwtAuth, getRequests);
router.get('/:id', jwtAuth, getProfile);

export default router;
