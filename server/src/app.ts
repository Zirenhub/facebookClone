import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoute from './routes/authRoute';
import postRoute from './routes/postRoute';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute);

mongoose.connect(process.env.DB_URI!).then(() => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
