import { Types } from 'mongoose';

export interface IComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  parentComment?: Types.ObjectId;
  content: string;
}
