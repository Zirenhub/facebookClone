import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { getPosts } from '../../api/post';
import { TDBPost } from '../../types/Post';
import ImagePost from '../../components/HomePage/Mobile/PostTypes/ImagePost';
import DefaultPost from '../../components/HomePage/Mobile/PostTypes/DefaultPost';

function HomePage() {
  const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <MobileWritePost />
      <MobileAddStory />
      {data?.map((post) => {
        return (
          <div key={post._id} className="mt-2 border-b-4 border-slate-400">
            {post.image ? (
              <ImagePost data={post} />
            ) : (
              <DefaultPost data={post} />
            )}
            <div className="flex justify-between text-gray-600 font-bold px-4 mt-1 py-1 border-t-2">
              <button type="button">Like</button>
              <button type="button">Comment</button>
              <button type="button">Share</button>
            </div>
          </div>
        );
      })}
      {isError && <p>{error.message}</p>}
    </div>
  );
}

export default HomePage;
