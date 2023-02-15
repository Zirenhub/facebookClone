export type TPost = {
  content: string;
  background:
    | 'post-bg-one'
    | 'post-bg-two'
    | 'post-bg-three'
    | 'post-bg-four'
    | null;
  image: File | null;
  audience: 'friends' | 'public';
};

export type ReactionTypes = 'like' | 'laugh' | 'heart';

export type Reactions = {
  author: string;
  type: ReactionTypes;
  _id: string;
}[];

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
  reactions: Reactions;
  createdAt: string;
  updatedAt: string;
};
