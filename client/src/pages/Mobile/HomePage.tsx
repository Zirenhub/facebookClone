/* eslint-disable no-nested-ternary */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { getTimeline } from '../../api/post';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';
import usePosts from '../../hooks/usePosts';

function HomePage() {
  const auth = useAuthContext();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', 'timeline'],
    queryFn: getTimeline,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  const {
    mutationCreatePost,
    mutationDeletePost,
    mutationReactPost,
    posts,
    setInitialPosts,
  } = usePosts();

  useEffect(() => {
    if (status === 'success' && !isFetching) {
      const allPosts = data.pages.reduce((acc, page) => {
        return acc.concat(page.posts as []);
      }, []);
      setInitialPosts(allPosts);
    }
  }, [data, isFetching, setInitialPosts, status]);

  useEffect(() => {
    const container = document.body;

    function handleScroll() {
      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight;
      if (isAtBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="p-2 h-full overflow-auto" id="homepage">
      <MobileWritePost mutationCreatePost={mutationCreatePost} />
      <MobileAddStory />
      {posts
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        .map((post) => {
          let isAuthor = false;
          if (post.author._id === auth.user?._id) {
            isAuthor = true;
          }

          return (
            <div key={post._id} className="mt-2 border-b-4 border-slate-400">
              <SingularPost
                post={post}
                deletePost={isAuthor ? mutationDeletePost : undefined}
                reactPost={mutationReactPost}
              />
            </div>
          );
        })}
      {status === 'error' && error instanceof Error && <p>{error.message}</p>}
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
