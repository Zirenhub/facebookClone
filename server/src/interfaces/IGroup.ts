import { Types } from 'mongoose';

export interface IGroup {
  owner: Types.ObjectId;
  name: string;
  invited: Types.ObjectId[];
}
