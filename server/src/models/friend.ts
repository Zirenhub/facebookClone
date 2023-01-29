import mongoose from 'mongoose';
import { IFriend } from '../interfaces/IFriend';

const Schema = mongoose.Schema;

const FriendSchema = new Schema<IFriend>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    friend: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Declined'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const FriendModel = mongoose.model<IFriend>('Friend', FriendSchema);

export default FriendModel;