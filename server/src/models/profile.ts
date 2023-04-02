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

ProfileSchema.virtual('fullName').get(function () {
  return `
${this.firstName[0].toUpperCase()}${this.firstName.substring(1, this.firstName.length)}
${this.lastName[0].toUpperCase()}${this.lastName.substring(1, this.lastName.length)}
`;
});

ProfileSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    if (ret.id) {
      delete ret.id;
    }
    return ret;
  },
  versionKey: false,
  getters: true,
});

ProfileSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    if (ret.id) {
      delete ret.id;
    }
    return ret;
  },
  versionKey: false,
  getters: true,
});

const ProfileModel = mongoose.model<IProfile>(
  'Profile',
  ProfileSchema
);

export default ProfileModel;
