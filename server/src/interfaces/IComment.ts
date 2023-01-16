import { Types } from 'mongoose';

export interface IComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
}
