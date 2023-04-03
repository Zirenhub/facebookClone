import express, { Express, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import authRoute from './routes/authRoute';
import postRoute from './routes/postRoute';
import profileRoute from './routes/profileRoute';
import searchRoute from './routes/searchRoute';
import timelineRoute from './routes/timelineRoute';
import commentRoute from './routes/commentRoute';
import messagesRoute from './routes/messagesRoute';
import { IUserRequest, jwtAuth } from './middleware/jwtAuth';
import getFriendsIds from './utils/getFriendsIds';

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    allowedHeaders: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    allowedHeaders: '*',
    credentials: true,
  },
});

const port = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', jwtAuth, postRoute);
app.use('/api/v1/profile', jwtAuth, profileRoute);
app.use('/api/v1/search', jwtAuth, searchRoute);
app.use('/api/v1/timeline', jwtAuth, timelineRoute);
app.use('/api/v1/comment', jwtAuth, commentRoute);

let onlineUsers: string[] = [];
io.on('connection', (socket) => {
  // for some reason can't get token from socket initialization
  const id = socket.handshake.auth.id;
  if (!id) {
    socket.disconnect();
  }
  // this room is used for notifications
  socket.join(id);

  if (!onlineUsers.some((onlineID) => onlineID === id)) {
    onlineUsers.push(id);
  }

  console.log('a user connected', onlineUsers);

  // these rooms are used for gorups
  socket.on('joinGroup', (groupID) => {
    socket.join(groupID);
  });

  socket.on('leaveGroup', (groupID) => {
    socket.leave(groupID);
  });

  // these rooms are used for private chats
  socket.on('joinChat', (chatID) => {
    socket.join(chatID);
  });

  socket.on('leaveChat', (chatID) => {
    socket.leave(chatID);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((onlineID) => onlineID !== id);
    socket.leave(id);
    console.log('user disconnected', onlineUsers);
  });

  socket.on('offline', () => {
    onlineUsers = onlineUsers.filter((onlineID) => onlineID !== id);
    socket.leave(id);
    console.log('user is offline', onlineUsers);
  });
});

app.use('/api/v1/messages', jwtAuth, messagesRoute(io));
app.use(
  '/api/v1/online-friends',
  jwtAuth,
  async (req: IUserRequest, res: Response) => {
    try {
      const id = req.user._id;
      const friends = await getFriendsIds(id);
      const onlineFriends = onlineUsers.filter((onlineID) => {
        return friends.includes(onlineID);
      });

      return res.json({
        status: 'success',
        data: onlineFriends,
        message: null,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err.message,
      });
    }
  }
);

mongoose.connect(process.env.DB_URI!).then(() => {
  server.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
