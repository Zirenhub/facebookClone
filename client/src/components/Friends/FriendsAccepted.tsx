import { useQuery } from '@tanstack/react-query';
import { getFriends } from '../../api/profile';
import Loading from '../Loading';
import { TProfileDefault } from '../../types/Profile';
import ProfileCards from '../ProfilePages/ProfileCards';

function FriendsAccepted() {
  const { isLoading, isError, data, error } = useQuery<
    TProfileDefault[],
    Error
  >({
    queryKey: ['friends'],
    queryFn: () => getFriends(),
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return <ProfileCards profiles={data || []} />;
}

export default FriendsAccepted;
