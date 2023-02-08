import { Types } from 'mongoose';
import { IReaction } from './IReaction';

export interface IPost {
  author: Types.ObjectId;
  audience: string;
  content: string;
  background: string;
  image: {
    data: Buffer;
    contentType: String;
  };
  comments: Types.ObjectId;
  reactions: Types.DocumentArray<IReaction>;
}
