/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import Pfp from '../../assets/pfp-one.svg';
import CreatePost from '../../components/Posts/CreatePost';
import usePosts from '../../hooks/usePosts';
import WritePost from '../../components/HomePage/Desktop/WritePost';
import SingularPost from '../../components/Posts/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';

type PagesT = 'Stories' | 'Reels';

function HomePageMainStories() {
  return (
    <div className="flex">
      <div
        className="flex flex-col shadow-sm transition-all rounded-lg bg-[#bfc2c7] hover:bg-gray-300"
        role="button"
      >
        <div className="h-[190px] w-[140px] grow">
          <Pfp width="100%" height="100%" fill="#e7e7e7" />
        </div>
        <div className="relative bg-white rounded-b-lg">
          <div className="bg-blue-500 h-8 w-8 absolute -top-4 rounded-full left-2/4 -translate-x-2/4 flex justify-center items-center border-4 border-white">
            <p className="text-white text-2xl">+</p>
          </div>
          <p className="text-center text-md my-3">Create Story</p>
        </div>
      </div>
      <div className="flex flex-col grow justify-center gap-5 pl-10 text-lg">
        <p>Share everyday moments with friends and family.</p>
        <p>Stories disapper after 24 hours.</p>
        <p>Replies and reactions are private.</p>
      </div>
    </div>
  );
}

function HomePageMain() {
  const [currentPage, setCurrentPage] = useState<PagesT>('Stories');
  const [createPostModal, setCreatePostModal] = useState<boolean>(false);

  const pages: PagesT[] = ['Stories', 'Reels'];
  const postTypes = ['Live video', 'Photo/video', 'Feeling/activity'];
  const auth = useAuthContext();

  const {
    posts,
    mutationCreatePost,
    mutationDeletePost,
    mutationReactPost,
    handleScroll,
  } = usePosts({
    postsType: 'timeline',
  });

  return (
    <div
      className="flex flex-col gap-8 py-4 overflow-scroll"
      onScroll={handleScroll}
    >
      {createPostModal && (
        <CreatePost
          isMobile={false}
          mutationCreatePost={mutationCreatePost}
          close={() => setCreatePostModal(false)}
        />
      )}
      <div className="bg-white shadow-md flex flex-col rounded-lg">
        <div className="flex m-2">
          {pages.map((b, i) => {
            return (
              <div
                key={i}
                className="flex flex-col grow hover:bg-gray-200 rounded-lg transition-all"
              >
                <button
                  type="button"
                  className={`${
                    currentPage === b ? 'text-blue-500' : 'text-gray-500'
                  }  font-bold px-8 py-4 text-xl`}
                  onClick={() => setCurrentPage(b)}
                >
                  {b}
                </button>
                {currentPage === b && <div className="h-1 bg-blue-500" />}
              </div>
            );
          })}
        </div>
        <div className="p-5">
          {currentPage === 'Stories' ? (
            <HomePageMainStories />
          ) : (
            <p>test reels</p>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md flex flex-col rounded-lg p-3">
        <WritePost openCreatePostModal={() => setCreatePostModal(true)} />
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex text-dimGray">
          {postTypes.map((b, i) => {
            return (
              <button
                type="button"
                className="p-3 grow font-bold rounded-lg hover:bg-gray-100"
                key={i}
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
            className="bg-white rounded-md shadow-md p-4 max-w-[600px] min-w-[200px]"
          >
            <SingularPost
              isMobile={false}
              post={post}
              mutationDeletePost={isAuthor ? mutationDeletePost : undefined}
              mutationReactPost={mutationReactPost}
            />
          </div>
        );
      })}
    </div>
  );
}

export default HomePageMain;
