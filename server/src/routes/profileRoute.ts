import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getProfile,
  sendRequest,
  getRequests,
  acceptRequest,
} from '../controllers/profileController';

const router = express.Router();

router.post('/:id/request', jwtAuth, sendRequest);
router.post('/:id/accept', jwtAuth, acceptRequest);
router.get('/requests', jwtAuth, getRequests);
router.get('/:id', jwtAuth, getProfile);

export default router;
