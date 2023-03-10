import express from 'express';
import {
  getProfile,
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  getFriends,
  getPosts,
} from '../controllers/profileController';

const router = express.Router();

router.post('/:id/request', sendRequest);
router.post('/:id/accept', acceptRequest);
router.post('/:id/reject', rejectRequest);
router.get('/requests', getRequests);
router.get('/friends', getFriends);
router.get('/:id', getProfile);
router.get('/:id/posts', getPosts);

export default router;
