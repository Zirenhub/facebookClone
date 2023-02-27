import { Comment, ReactionTypes, TDBPost } from './Post';
import { TProfile, TProfileWithoutFullName } from './Profile';
import { DefaultReq, TRequest } from './Request';

export type ValidationError = {
  location: string;
  msg: string;
  param: string;
  value: string;
};

export type CreatePostRes = {
  status: 'success' | 'error';
  data?: TDBPost;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type PostsRes = {
  status: 'success' | 'error';
  data?: { posts: TDBPost[]; nextCursor: string | null };
  errors?: null;
  message: string | null;
};

export type EmptyRes = {
  status: 'success' | 'error';
  data?: null;
  errors?: null;
  message: null | string;
};

export type ReactToPostData = {
  author: string;
  type: ReactionTypes;
  _id: string;
};

export type ReactToPostRes = {
  status: 'success' | 'error';
  data?: ReactToPostData;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type GetProfileRes = {
  status: 'success' | 'error';
  data?: TProfile;
  errors?: null;
  message: string | null;
};

export type SendRequestRes = {
  status: 'success' | 'error';
  data?: DefaultReq;
  errors?: null;
  message: string | null;
};

export type GetRequestsRes = {
  status: 'success' | 'error';
  data?: TRequest[];
  errors?: null;
  message: string | null;
};

export type GetFriendsRes = {
  status: 'success' | 'error';
  data?: TProfileWithoutFullName[];
  errors?: null;
  message: string | null;
};

export type GetProfilePostsRes = {
  status: 'success' | 'error';
  data?: TDBPost[];
  errors?: null;
  message: string | null;
};

export type PostCommentRes = {
  status: 'success' | 'error';
  data?: Comment;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type GetPostCommentsRes = {
  status: 'success' | 'error';
  data?: Comment[];
  errors?: null;
  message: string | null;
};
