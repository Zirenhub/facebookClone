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
    <div className="flex flex-col">
      <Suspense fallback={<Loading />}>
        <MobileWritePost />
        <MobileAddStory />
        {data?.map((post) => {
          console.log(post);

          return (
            <div key={post._id}>
              {post.image ? (
                <ImagePost data={post} />
              ) : (
                <DefaultPost data={post} />
              )}
            </div>
          );
        })}
        {isError && <p>{error.message}</p>}
      </Suspense>
    </div>
  );
}

export default HomePage;
