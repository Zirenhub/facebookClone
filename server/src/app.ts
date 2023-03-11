import express, { Express } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import authRoute from './routes/authRoute';
import postRoute from './routes/postRoute';
import profileRoute from './routes/profileRoute';
import searchRoute from './routes/searchRoute';
import timelineRoute from './routes/timelineRoute';
import commentRoute from './routes/commentRoute';
import { jwtAuth } from './middleware/jwtAuth';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', jwtAuth, postRoute);
app.use('/api/v1/profile', jwtAuth, profileRoute);
app.use('/api/v1/search', jwtAuth, searchRoute);
app.use('/api/v1/timeline', jwtAuth, timelineRoute);
app.use('/api/v1/comment', jwtAuth, commentRoute);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg, receiverID) => {
    console.log('message', msg, receiverID);
  });
});

mongoose.connect(process.env.DB_URI!).then(() => {
  server.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
