import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TProfile } from '../types/Profile';
import OwnProfile from '../components/ProfilePages/Mobile/OwnProfile';
import StrangerProfile from '../components/ProfilePages/Mobile/StrangerProfile';
import Loading from '../components/Loading';
import useAuthContext from '../hooks/useAuthContext';
import { getProfile } from '../api/profile';

function ProfilePage({ isMobile }: { isMobile: boolean }) {
  const { id } = useParams();
  const auth = useAuthContext();

  const { isLoading, isError, data, error } = useQuery<TProfile, Error>({
    queryKey: ['profile', id],
    queryFn: () => {
      if (id) {
        return getProfile(id);
      }
      throw new Error('ID is invalid.');
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>404</p>
        <p>{error.message}</p>
      </div>
    );
  }

  console.log(data);

  if (data._id === auth.user?._id) {
    return isMobile ? <OwnProfile data={data} /> : <p>Desktop Profile</p>;
  }

  return isMobile ? (
    <StrangerProfile profileData={data} />
  ) : (
    <p>Desktop Profile</p>
  );
}

export default ProfilePage;
