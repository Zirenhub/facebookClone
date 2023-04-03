import express from 'express';
import { Server } from 'socket.io';
import {
  postMessage,
  getMessages,
  createGroup,
  sendGroupMessage,
  getGroups,
  getGroupMessages,
} from '../controllers/messageController';

const messagesRoute = (io: Server) => {
  const router = express.Router();

  router.get('/private/:id', getMessages);
  router.post('/private/:id', postMessage(io));

  router.get('/group', getGroups);
  router.get('/group/:id', getGroupMessages);
  router.post('/group/:id', sendGroupMessage(io));
  router.post('/group', createGroup);

  return router;
};

export default messagesRoute;
