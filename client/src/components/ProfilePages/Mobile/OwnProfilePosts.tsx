import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getProfilePosts } from '../../../api/profile';
import Pfp from '../../../assets/pfp-two.svg';
import Pictures from '../../../assets/pictures.svg';
import usePosts from '../../../hooks/usePosts';
import CreatePostModal from '../../HomePage/Mobile/CreatePost';
import SingularPost from '../../HomePage/Mobile/SingularPost';

function OwnProfilePosts({ id }: { id: string }) {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', id],
    queryFn: ({ pageParam = 0 }) => getProfilePosts(id, pageParam),
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

  if (openCreatePost) {
    return (
      <CreatePostModal
        close={() => setOpenCreatePost(false)}
        mutationCreatePost={mutationCreatePost}
      />
    );
  }

  return (
    <div className="p-2">
      <div className="flex flex-col border-b-4">
        <p className="font-bold">Details</p>
        <p className="text-dimGray">No details avalible</p>
        <div className="flex flex-col gap-2 pt-2 pb-2">
          <button type="button" className="self-start">
            ... See your About Info
          </button>
          <button
            type="button"
            className="bg-blue-100 text-blue-500 rounded-md py-1"
          >
            Edit public details
          </button>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Friends</p>
          <button type="button" className="text-blue-500">
            Find Friends
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">Posts</p>
        <div className="flex gap-2">
          <div className="h-10 w-10">
            <Pfp height="100%" width="100%" />
          </div>
          <button
            type="button"
            className="rounded-full p-2 border-2 grow"
            onClick={() => setOpenCreatePost(true)}
          >
            What&apos;s on your mind?
          </button>
          <div className="h-10 w-10">
            <Pictures height="100%" width="100%" />
          </div>
        </div>
      </div>
      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'error' && error instanceof Error && (
        <p className="text-center">{error.message}</p>
      )}
      {posts
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        .map((post) => {
          return (
            <div key={post._id} className="mt-2 border-b-4 border-slate-400">
              <SingularPost
                post={post}
                deletePost={mutationDeletePost}
                reactPost={mutationReactPost}
              />
            </div>
          );
        })}
    </div>
  );
}

export default OwnProfilePosts;
