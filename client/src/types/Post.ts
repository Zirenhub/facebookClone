export type TPost = {
  content: string;
  background: string | null;
  image: File | null;
  audience: string;
};

export type TDBPost = {
  __v: string;
  _id: string;
  author: {
    birthday: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    customGender?: string;
  };
  audience: string;
  content: string;
  image?: string;
  background?: string | null;
  reactions: [];
  createdAt: string;
  updatedAt: string;
};
