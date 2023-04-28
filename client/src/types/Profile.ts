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

export type OwnProfileProps = {
  profile: TProfile;
  postsProps: {
    posts: ModifiedPost[];
    mutationCreatePost: {
      isLoading: boolean;
      isError: boolean;
      error: unknown;
      createPost: (post: TPost) => void;
    };
    mutationReactPost: {
      isLoading: boolean;
      isError: boolean;
      error: unknown;
      reactPost: (postId: string, r: ReactionTypes | null) => void;
    };
    mutationDeletePost: {
      isLoading: boolean;
      isError: boolean;
      error: unknown;
      deletePost: (postId: string) => void;
    };
  };
};
