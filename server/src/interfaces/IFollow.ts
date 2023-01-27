import { Types } from 'mongoose';

export interface IFollow {
  follower: Types.ObjectId;
  followed: Types.ObjectId;
}
