import { Types } from 'mongoose';

export interface IGroupMessage {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  message: string;
}
