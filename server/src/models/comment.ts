import mongoose from 'mongoose';
import { IComment } from '../interfaces/IComment';

const Schema = mongoose.Schema;

const CommentSchema = new Schema<IComment>(
  {
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
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    replies: {
      type: Number,
      required: true,
      default: 0,
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

const CommentModel = mongoose.model<IComment>(
  'Comment',
  CommentSchema
);

export default CommentModel;
