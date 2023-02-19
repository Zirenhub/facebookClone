import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { deletePost, getPosts } from '../../api/post';
import { TDBPost } from '../../types/Post';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';

function HomePage() {
  const [posts, setPosts] = useState<TDBPost[]>([]);

  const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
    queryKey: ['posts', 'timeline'],
    queryFn: () => getPosts(),
    refetchOnWindowFocus: false,
  });

  const mutationDeletePost = useMutation({
    mutationFn: (postID: string) => {
      return deletePost(postID);
    },
    onSuccess(successData, variables, context) {
      setPosts(posts.filter((post) => post._id !== variables));
    },
  });

  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <MobileWritePost setPosts={setPosts} posts={posts} />
      <MobileAddStory />
      {posts && (
        <div>
          {posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            )
            .map((post) => {
              return (
                <div
                  key={post._id}
                  className="mt-2 border-b-4 border-slate-400"
                >
                  <SingularPost post={post} deletePost={mutationDeletePost} />
                </div>
              );
            })}
        </div>
      )}
      {isError && <p>{error.message}</p>}
    </div>
  );
}

export default HomePage;
