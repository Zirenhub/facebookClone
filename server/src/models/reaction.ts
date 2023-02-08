import mongoose from 'mongoose';
import { IReaction } from '../interfaces/IReaction';

const Schema = mongoose.Schema;

const ReactionSchema = new Schema<IReaction>({
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
});

const ReactionModel = mongoose.model<IReaction>('Reaction', ReactionSchema);

export { ReactionModel, ReactionSchema };
