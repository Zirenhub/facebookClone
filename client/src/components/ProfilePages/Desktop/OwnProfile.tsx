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
  const width = 1200;

  return (
    <div className="h-full flex flex-col items-center overflow-scroll relative">
      {createPostModal && (
        <CreatePost
          mutationCreatePost={mutationCreatePost}
          close={() => setCreatePostModal(false)}
          isMobile={false}
        />
      )}
      <div className="w-full shadow-sm flex justify-center z-20">
        <div className={`w-[${width}px]  relative`}>
          <ProfileHeader fullName={profile.fullName} />
        </div>
      </div>
      <div className="w-full flex justify-center bg-gray-100">
        <div className={`w-[${width}px]`}>
          <div className="flex flex-col px-6">
            <div className="py-4 flex gap-5">
              <div className="flex flex-col grow gap-4 sticky top-0">
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
                    <div
                      className={`${cardClass} flex justify-between`}
                      key={b}
                    >
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
              <div className="flex flex-col w-[55%] gap-4 h-max">
                <WritePost
                  openCreatePostModal={() => setCreatePostModal(true)}
                />
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
      </div>
    </div>
  );
}

export default OwnProfile;
