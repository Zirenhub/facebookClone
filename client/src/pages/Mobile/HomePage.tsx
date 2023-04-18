/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';
import usePosts from '../../hooks/usePosts';
import CreatePostModal from '../../components/HomePage/CreatePost';

function HomePage() {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  const auth = useAuthContext();

  const {
    mutationCreatePost,
    mutationDeletePost,
    mutationReactPost,
    posts,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    status,
    fetchNextPage,
  } = usePosts({ postsType: 'timeline', handleScroll: false });
  // timline does not need second parameter "id"

  if (status === 'loading') {
    return <Loading />;
  }

  function handleScroll(e: React.SyntheticEvent) {
    const target = e.target as HTMLDivElement;
    const currentScroll = target.scrollHeight - Math.ceil(target.scrollTop);
    const isAtBottom = currentScroll - 100 <= target.clientHeight;
    if (isAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <div className="p-2 h-full overflow-auto" onScroll={handleScroll}>
      {openCreatePost && (
        <CreatePostModal
          isMobile
          mutationCreatePost={mutationCreatePost}
          close={() => setOpenCreatePost(false)}
        />
      )}
      <MobileWritePost openCreatePostModal={() => setOpenCreatePost(true)} />
      <MobileAddStory />
      {posts.map((post) => {
        const isAuthor = post.author._id === auth.user?._id;

        return (
          <div key={post._id} className="mt-2 border-b-4 border-slate-400">
            <SingularPost
              post={post}
              mutationDeletePost={isAuthor ? mutationDeletePost : undefined}
              mutationReactPost={mutationReactPost}
            />
          </div>
        );
      })}
      {error && <p>{error}</p>}
      <p>
        {isFetchingNextPage && 'Loading more...'}
        {hasNextPage && 'Load More'}
        {!isFetchingNextPage && !hasNextPage && 'Nothing more to load'}
      </p>
      {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
    </div>
  );
}

export default HomePage;
