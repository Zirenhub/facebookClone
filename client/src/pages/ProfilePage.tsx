import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TProfile } from '../types/Profile';
import OwnProfile from '../components/ProfilePages/Mobile/OwnProfile';
import StrangerProfile from '../components/ProfilePages/Mobile/StrangerProfile';
import Loading from '../components/Loading';
import useAuthContext from '../hooks/useAuthContext';
import { getProfile } from '../api/profile';
import { useHeader } from '../components/HOC/MobileHeader';

function ProfilePage({ isMobile }: { isMobile: boolean }) {
  const { id } = useParams();
  const auth = useAuthContext();
  const { setPage } = useHeader();

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

  useEffect(() => {
    setPage('profile');
    return () => {
      setPage(null);
    };
  }, [setPage]);

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
  return <StrangerProfile profileData={data} />;
}

export default ProfilePage;
