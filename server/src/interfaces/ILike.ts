import { Types } from 'mongoose';

export interface ILike {
  author: Types.ObjectId;
  post: Types.ObjectId;
}
