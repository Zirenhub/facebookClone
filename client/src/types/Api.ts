import { TGroup } from './Group';
import { TMessage } from './Message';
import { ReactionTypes, TComment, TDBPost } from './Post';
import { TProfile, TProfileDefault, TProfileFriend } from './Profile';
import { TRequest } from './Request';

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
  data?: { posts: TDBPost[]; nextCursor: number | null };
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

export type LikeCommentRes = {
  status: 'success' | 'error';
  data?: ReactToPostData;
  errors?: null;
  message: null | string;
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
  data?: TProfileFriend;
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
  data?: TProfileDefault[];
  errors?: null;
  message: string | null;
};

export type GetProfilePostsRes = {
  status: 'success' | 'error';
  data?: { posts: TDBPost[]; nextCursor: number | null };
  errors?: null;
  message: string | null;
};

export type PostCommentRes = {
  status: 'success' | 'error';
  data?: TComment;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type GetPostCommentsRes = {
  status: 'success' | 'error';
  data?: TComment[];
  errors?: null;
  message: string | null;
};

export type GetOnlineFrindsRes = {
  status: 'success' | 'error';
  data?: string[];
  errors?: null;
  message: string | null;
};

export type RegisterUserRes = {
  status: 'success' | 'error';
  data?: null;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type LogInUserRes = {
  status: 'success' | 'error';
  data?: TProfile;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type CreateGroupRes = {
  status: 'success' | 'error';
  data?: TGroup;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type GetGroupsRes = {
  status: 'success' | 'error';
  data?: TGroup[];
  errors?: null;
  message: string | null;
};

export type PostMessageRes = {
  status: 'success' | 'error';
  data?: null;
  errors?: ValidationError[] | null;
  message: string | null;
};

export type GetMessagesRes = {
  status: 'success' | 'error';
  data?: { messages: TMessage[]; nextCursor: number | null };
  errors?: null;
  message: string | null;
};

export type GetSearchRes = {
  status: 'success' | 'error';
  data?: TProfileDefault[];
  errors?: null;
  message: string | null;
};
