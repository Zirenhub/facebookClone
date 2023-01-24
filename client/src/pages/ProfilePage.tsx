import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import getProfile from '../api/profile';
import Loading from '../components/Loading';

function ProfilePage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id!), // id could be undefined, some typescript problems
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>404</p>;
  }

  return (
    <div>
      <p>Profile Page</p>
    </div>
  );
}

export default ProfilePage;
