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

export type DefaultReq = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  friend: string;
  profile: string;
  status: 'Accepted' | 'Pending';
};
