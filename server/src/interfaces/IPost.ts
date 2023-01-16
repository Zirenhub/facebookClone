import { Types } from 'mongoose';

export interface IPost {
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId;
  comments: Types.ObjectId;
}
