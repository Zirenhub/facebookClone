import express, { Express } from 'express';
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
import { jwtAuth } from './middleware/jwtAuth';

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

io.on('connection', (socket) => {
  const id = socket.handshake.auth.id;
  socket.join(id);
  console.log('a user connected', id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/api/v1/messages', jwtAuth, messagesRoute(io));

mongoose.connect(process.env.DB_URI!).then(() => {
  server.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
