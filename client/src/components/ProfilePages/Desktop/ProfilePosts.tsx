import React, { Suspense, useState } from 'react';
import Loading from '../../Loading';
import { ModifiedPost } from '../../../types/Post';
import {
  MutationReactPost,
  TOwnProfileMutations,
} from '../../../types/Profile';
import SingularPost from '../../Posts/SingularPost';

const WritePost = React.lazy(() => import('../../HomePage/Desktop/WritePost'));
const CreatePost = React.lazy(() => import('../../Posts/CreatePost'));

type Props = {
  posts: ModifiedPost[];
  isMe: boolean;
  mutations: {
    ownProfile: TOwnProfileMutations;
    mutationReactPost: MutationReactPost;
  };
};

function ProfilePosts({ posts, isMe, mutations }: Props) {
  const [createPostModal, setCreatePostModal] = useState<boolean>(false);
  const { ownProfile, mutationReactPost } = mutations;

  return (
    <>
      {createPostModal && (
        <Suspense fallback={<Loading />}>
          <CreatePost
            mutationCreatePost={ownProfile.mutationCreatePost}
            close={() => setCreatePostModal(false)}
            isMobile={false}
          />
        </Suspense>
      )}
      <div className="flex flex-col w-[55%] gap-4">
        {isMe && (
          <Suspense fallback={<Loading />}>
            <WritePost openCreatePostModal={() => setCreatePostModal(true)} />
          </Suspense>
        )}
        <div className="bg-white p-3 shadow-md rounded-lg flex flex-col">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Posts</p>
            <div className="flex gap-3">
              {['Filters', 'Manage Posts'].map((b) => {
                if (b === 'Manage Posts' && !isMe) {
                  return null;
                }
                return (
                  <button
                    type="button"
                    key={b}
                    className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-px bg-gray-300 my-2" />
          <div className="flex">
            {['List view', 'Grid view'].map((b) => {
              return (
                <button
                  type="button"
                  key={b}
                  className="grow text-dimGray hover:bg-gray-200 rounded-md"
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>
        {posts.map((post) => {
          return (
            <div key={post._id} className="bg-white rounded-md shadow-md p-4">
              <SingularPost
                isMobile={false}
                post={post}
                mutationDeletePost={
                  isMe ? ownProfile.mutationDeletePost : undefined
                }
                mutationReactPost={mutationReactPost}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProfilePosts;
