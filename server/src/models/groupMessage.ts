import mongoose from 'mongoose';
import { IMessage } from '../interfaces/IMessage';

const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
    message: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

GroupMessageSchema.set('toObject', {
  virtuals: true,
});

GroupMessageSchema.set('toJSON', {
  virtuals: true,
});

const GroupMessageModel = mongoose.model<IMessage>(
  'GroupMessage',
  GroupMessageSchema
);

export default GroupMessageModel;
