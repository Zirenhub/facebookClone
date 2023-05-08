import { ModifiedPost, ReactionTypes, TPost } from './Post';

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

export type MutationReactPost = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  reactPost: (postId: string, r: ReactionTypes | null) => void;
};

type MutationCreatePost = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  createPost: (post: TPost) => void;
};

type MutationDeletePost = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  deletePost: (postId: string) => void;
};

export type TOwnProfileMutations = {
  mutationCreatePost: MutationCreatePost;
  mutationDeletePost: MutationDeletePost;
};

export type TStrangerProfileMutations = {
  requestMutation: () => void;
};

export type DesktopHeaderButtons =
  | 'Posts'
  | 'About'
  | 'Friends'
  | 'Photos'
  | 'Videos'
  | 'Check-ins'
  | 'More';
