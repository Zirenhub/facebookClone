import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
const port = process.env.PORT || 5000;

app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ status: 'success', data: null, message: null });
});

mongoose.connect(process.env.DB_URI!).then(() => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
