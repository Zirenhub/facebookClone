/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { TProfile } from '../../../types/Profile';
import OwnProfilePosts from './OwnProfilePosts';
import ProfileHeader from './ProfileHeader';
import { ModifiedPost, ReactionTypes, TPost } from '../../../types/Post';

type Props = {
  profile: TProfile;
  postsProps: {
    posts: ModifiedPost[];
    mutationCreatePost: {
      isLoading: boolean;
      isError: boolean;
      error: unknown;
      createPost: (post: TPost, postType: 'default' | 'image') => void;
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

function OwnProfile({ profile, postsProps }: Props) {
  const [currentPage, setCurrentPage] = useState<'Posts' | 'Reels'>('Posts');
  const profilePages: ['Posts', 'Reels'] = ['Posts', 'Reels'];

  return (
    <>
      <ProfileHeader fullName={profile.fullName} />
      <div className="flex flex-col border-b-2 p-2">
        <div className="flex justify-between gap-2 border-b-8 border-gray-300 pb-4">
          <button
            type="button"
            className="flex items-center justify-center bg-blue-500 text-white py-1 font-bold rounded-md grow"
          >
            Add to story
          </button>
          {['Edit profile', '...'].map((b, i) => {
            return (
              <button
                type="button"
                key={i}
                className="bg-gray-300 font-bold rounded-md grow"
              >
                {b}
              </button>
            );
          })}
        </div>
        <div className="flex gap-4 pt-3">
          {profilePages.map((b, i) => {
            return (
              <button
                type="button"
                key={i}
                className={`${
                  currentPage === b &&
                  'text-blue-600 bg-blue-100 rounded-full px-2'
                } font-bold`}
                onClick={() => setCurrentPage(b)}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
      {currentPage === 'Posts' && (
        <OwnProfilePosts
          posts={postsProps.posts}
          mutationCreatePost={postsProps.mutationCreatePost}
          mutationReactPost={postsProps.mutationReactPost}
          mutationDeletePost={postsProps.mutationDeletePost}
        />
      )}
    </>
  );
}

export default OwnProfile;
