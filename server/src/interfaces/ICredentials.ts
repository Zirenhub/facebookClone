import { Types } from 'mongoose'

export interface ICredentials {
  email: string;
  password: string;
  profile: Types.ObjectId;
}
