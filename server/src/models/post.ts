import mongoose from 'mongoose';
import { IPost } from '../interfaces/IPost';
import { ReactionSchema } from '../models/reaction';

const Schema = mongoose.Schema;

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    audience: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    reactions: [ReactionSchema],
  },
  { timestamps: true }
);

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
