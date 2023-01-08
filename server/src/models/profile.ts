import mongoose from 'mongoose';
import { IProfile } from '../interfaces/IProfile';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema<IProfile>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model<IProfile>('Profile', ProfileSchema);

export default ProfileModel;
