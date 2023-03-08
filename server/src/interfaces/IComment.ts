import { Types } from 'mongoose';
import { IReaction } from './IReaction';

export interface IComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  parent: Types.ObjectId;
  content: string;
  replies: number;
  reactions: Types.DocumentArray<IReaction>;
}

export interface ModifiedComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  parent: Types.ObjectId;
  content: string;
  replies: number;
  reactions: Types.DocumentArray<IReaction>;
  children: IComment[];
}
