import express, { Express } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoute from './routes/authRoute';
import postRoute from './routes/postRoute';
import profileRoute from './routes/profileRoute';
import searchRoute from './routes/searchRoute';
import timelineRoute from './routes/timelineRoute';
import commentRoute from './routes/commentRoute';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/search', searchRoute);
app.use('/api/v1/timeline', timelineRoute);
app.use('/api/v1/comment', commentRoute);

mongoose.connect(process.env.DB_URI!).then(() => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
