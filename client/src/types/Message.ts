import { TProfileDefault } from './Profile';

export type TMessage = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  sender: string;
  receiver: string;
  message: string;
};

export type TGroupMessage = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  sender: TProfileDefault;
  receiver: string;
  message: string;
};
