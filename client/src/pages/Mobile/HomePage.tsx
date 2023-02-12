import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { getPosts } from '../../api/post';
import { TDBPost } from '../../types/Post';
import DisplayPosts from '../../components/HomePage/Mobile/DisplayPosts';

function HomePage() {
  const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <MobileWritePost />
      <MobileAddStory />
      {data && <DisplayPosts data={data} />}
      {isError && <p>{error.message}</p>}
    </div>
  );
}

export default HomePage;
