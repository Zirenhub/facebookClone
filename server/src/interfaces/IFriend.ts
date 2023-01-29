import { Types } from 'mongoose';

export interface IFriend {
  profile: Types.ObjectId;
  friend: Types.ObjectId;
  status: string;
}
