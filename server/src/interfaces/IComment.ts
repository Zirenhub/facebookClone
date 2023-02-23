import { Types } from 'mongoose';
import { IReaction } from './IReaction';

export interface IComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  parent: Types.ObjectId;
  content: string;
  reactions: Types.DocumentArray<IReaction>;
}
