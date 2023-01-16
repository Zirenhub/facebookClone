import mongoose from 'mongoose';
import { IPost } from '../interfaces/IPost';

const Schema = mongoose.Schema;

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
