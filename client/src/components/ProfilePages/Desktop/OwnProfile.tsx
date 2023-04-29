import { useState } from 'react';
import { OwnProfileProps } from '../../../types/Profile';
import WritePost from '../../HomePage/Desktop/WritePost';
import ProfileHeader from './ProfileHeader';
import CreatePost from '../../Posts/CreatePost';
import useAuthContext from '../../../hooks/useAuthContext';
import SingularPost from '../../Posts/SingularPost';

function OwnProfile({ profile, postsProps }: OwnProfileProps) {
  const [createPostModal, setCreatePostModal] = useState<boolean>(false);
  const { mutationCreatePost, mutationDeletePost, mutationReactPost, posts } =
    postsProps;

  const auth = useAuthContext();
  const introButtons = [
    'Add bio',
    'Edit details',
    'Add hobies',
    'Add featured',
  ];
  const cardClass = 'bg-white p-3 shadow-md rounded-lg';

  return (
    <div className="flex flex-col">
      {createPostModal && (
        <CreatePost
          mutationCreatePost={mutationCreatePost}
          close={() => setCreatePostModal(false)}
          isMobile={false}
        />
      )}
      <ProfileHeader fullName={profile.fullName} />
      <div className="grow flex justify-center py-4 bg-gray-100">
        <div className="basis-[1200px] px-6 flex gap-5">
          <div className="flex flex-col grow gap-4">
            <div className={`flex flex-col ${cardClass} gap-3`}>
              <p className="font-bold text-xl">Intro</p>
              {introButtons.map((b) => {
                return (
                  <button
                    type="button"
                    key={b}
                    className="rounded-lg bg-gray-200 py-2 hover:bg-gray-300"
                  >
                    {b}
                  </button>
                );
              })}
            </div>
            {['Photos', 'Friends'].map((b) => {
              return (
                <div className={`${cardClass} flex justify-between`} key={b}>
                  <button
                    type="button"
                    className="font-bold text-xl hover:underline"
                  >
                    {b}
                  </button>
                  <button
                    type="button"
                    className="text-blue-400 hover:bg-gray-100 rounded-md p-2"
                  >
                    See all {b}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-[55%] gap-4">
            <WritePost openCreatePostModal={() => setCreatePostModal(true)} />
            <div className={`${cardClass} flex flex-col`}>
              <div className="flex justify-between">
                <p className="text-xl font-bold">Posts</p>
                <div className="flex gap-3">
                  {['Filters', 'Manage posts'].map((b) => {
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
              const isAuthor = post.author._id === auth.user?._id;
              return (
                <div
                  key={post._id}
                  className="bg-white rounded-md shadow-md p-4"
                >
                  <SingularPost
                    isMobile={false}
                    post={post}
                    mutationDeletePost={
                      isAuthor ? mutationDeletePost : undefined
                    }
                    mutationReactPost={mutationReactPost}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnProfile;
