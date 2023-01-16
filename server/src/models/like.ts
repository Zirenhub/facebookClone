import mongoose from 'mongoose';
import { ILike } from '../interfaces/ILike';

const Schema = mongoose.Schema;

const LikeSchema = new Schema<ILike>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

const LikeModel = mongoose.model<ILike>('Like', LikeSchema);

export default LikeModel;
