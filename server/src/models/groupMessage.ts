import mongoose from 'mongoose';
import { IGroupMessage } from '../interfaces/IGroupMessage';

const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema<IGroupMessage>(
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

const GroupMessageModel = mongoose.model<IGroupMessage>(
  'GroupMessage',
  GroupMessageSchema
);

export default GroupMessageModel;
