import { TProfile } from './Profile';

export type TRequest = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  friend: TProfile;
  profile: string;
  status: 'Accepted' | 'Pending';
};
