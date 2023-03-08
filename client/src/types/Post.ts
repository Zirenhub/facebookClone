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

export type ReactionsDetails = {
  like: number;
  heart: number;
  laugh: number;
  reactionsNum: number;
  commentsNum: number;
  myReaction: ReactionTypes | null;
};

type PopulatedAuthor = {
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

export type TDBPost = {
  __v: string;
  _id: string;
  author: PopulatedAuthor;
  audience: string;
  content: string;
  image?: string;
  background?: string | null;
  reactions: Reactions;
  createdAt: string;
  updatedAt: string;
};

export type ModifiedPost = {
  __v: string;
  _id: string;
  author: PopulatedAuthor;
  audience: string;
  content: string;
  image?: string;
  background?: string | null;
  reactions: Reactions;
  reactionsDetails: {
    laugh: number;
    heart: number;
    like: number;
    reactionsNum: number;
    commentsNum: number;
    myReaction: ReactionTypes | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type NestedComment = {
  __v: string;
  _id: string;
  author: PopulatedAuthor;
  post: string;
  parent: string;
  content: string;
  replies: number;
  reactions: Reactions;
  createdAt: string;
  updatedAt: string;
  children?: NestedComment[];
};

export type TComment = {
  __v: string;
  _id: string;
  author: PopulatedAuthor;
  post: string;
  parent?: string;
  content: string;
  replies: number;
  reactions: Reactions;
  createdAt: string;
  updatedAt: string;
  children?: NestedComment[];
};
