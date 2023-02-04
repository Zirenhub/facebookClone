export type TProfileFriend = {
  __v: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  friend: string;
  profile: string;
  status: string;
};

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

export type TProfileWithoutFullName = {
  __v: string;
  _id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  customGender?: string;
  createdAt: string;
  updatedAt: string;
};
