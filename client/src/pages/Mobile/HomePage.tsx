import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import { getPosts } from '../../api/post';
import { TDBPost } from '../../types/Post';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';

function HomePage() {
  const auth = useAuthContext();

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
      {data && (
        <div>
          {data.map((post) => {
            return (
              <div key={post._id} className="mt-2 border-b-4 border-slate-400">
                <SingularPost post={post} userID={auth.user?._id} />
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
