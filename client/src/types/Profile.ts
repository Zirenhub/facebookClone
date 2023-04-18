export type TProfileFriend = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  friend: string;
  profile: string;
  status: 'Accepted' | 'Pending';
};

export type TFriendStatus = 'request' | 'accept' | 'reject';

export type TProfile = {
  __v: string;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: string;
  gender: string;
  friendStatus: TProfileFriend | null;
  customGender?: string;
  createdAt: string;
  updatedAt: string;
};

export type TProfileDefault = {
  __v: string;
  _id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  customGender?: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

// export type TProfileWithoutFullName = {
//   __v: string;
//   _id: string;
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   gender: string;
//   customGender?: string;
//   createdAt: string;
//   updatedAt: string;
// };
