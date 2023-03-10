import express from 'express';
import { Server } from 'socket.io';
import {
  postMessage,
  getMessages,
} from '../controllers/messageController';

const messagesRoute = (io: Server) => {
  const router = express.Router();

  router.get('/:id', getMessages);
  router.post('/', postMessage(io));

  return router;
};

export default messagesRoute;
