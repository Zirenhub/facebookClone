import mongoose from 'mongoose';
import { IMessage } from '../interfaces/IMessage';

const Schema = mongoose.Schema;

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>(
  'Message',
  MessageSchema
);

export default MessageModel;
