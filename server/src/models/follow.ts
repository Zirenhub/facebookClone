import mongoose from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Schema = mongoose.Schema;

const FollowSchema = new Schema<IFollow>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    followed: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

// unique index to ensure that the follower can only follow once
FollowSchema.index({ follower: 1, followed: 1 }, { unique: true });

const FollowModel = mongoose.model<IFollow>('Follow', FollowSchema);

export default FollowModel;
