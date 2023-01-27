import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TProfile } from '../types/Profile';
import OwnProfile from '../components/ProfilePages/OwnProfile';
import StrangerProfile from '../components/ProfilePages/StrangerProfile';
import Loading from '../components/Loading';
import useAuthContext from '../hooks/useAuthContext';
import { getProfile } from '../api/profile';

function ProfilePage({ isMobile }: { isMobile: boolean }) {
  const { id } = useParams();
  const auth = useAuthContext();

  const { isLoading, isError, data, error } = useQuery<TProfile, Error>({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id!),
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

  if (data._id === auth.user?._id) {
    // return isMobile ? <OwnProfile data={data} /> : '';
    return <OwnProfile data={data} />;
  }

  // return isMobile ? <StrangerProfile data={data} /> : '';
  return <StrangerProfile data={data} />;
}

export default ProfilePage;
