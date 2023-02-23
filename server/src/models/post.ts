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
    reactions: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: 'Profile',
          required: true,
        },
        type: {
          type: String,
          enum: ['like', 'heart', 'laugh'],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

PostSchema.index({ author: 1 });

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
