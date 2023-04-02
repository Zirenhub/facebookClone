import { TProfileDefault } from './Profile';

export type TMessage = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  sender: TProfileDefault;
  receiver: string;
  message: string;
};
