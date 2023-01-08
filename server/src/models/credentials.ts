import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ICredentials } from '../interfaces/ICredentials';

const Schema = mongoose.Schema;

const CredentialsSchema = new Schema<ICredentials>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

CredentialsSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

const CredentialsModel = mongoose.model<ICredentials>(
  'Credentials',
  CredentialsSchema
);

export default CredentialsModel;
