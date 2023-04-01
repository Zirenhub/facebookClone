import mongoose from 'mongoose';
import { IGroup } from '../interfaces/IGroup';

const Schema = mongoose.Schema;

const GroupSchema = new Schema<IGroup>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 25,
    },
    invited: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const GroupModel = mongoose.model<IGroup>('Group', GroupSchema);

export default GroupModel;
