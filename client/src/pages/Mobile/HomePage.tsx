import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { getTimeline } from '../../api/post';
import { TDBPost } from '../../types/Post';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';
import usePosts from '../../hooks/usePosts';

function HomePage() {
  const auth = useAuthContext();

  // const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
  //   queryKey: ['posts', 'timeline'],
  //   queryFn: () => getTimeline(),
  //   refetchOnWindowFocus: false,
  // });

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
  });

  const { mutationDeletePost, mutationReactPost, posts, setPosts } = usePosts(
    data?.posts
  );

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <MobileWritePost setPosts={setPosts} posts={posts} />
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
      {status === 'error' && <p>{error.message}</p>}
    </div>
  );
}

export default HomePage;
