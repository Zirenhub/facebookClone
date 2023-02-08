import { Types } from 'mongoose';

export interface IReaction {
  author: Types.ObjectId;
  type: string;
}
