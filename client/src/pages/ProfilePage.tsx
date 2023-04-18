import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { TFriendStatus, TProfile, TProfileFriend } from '../types/Profile';
import OwnProfile from '../components/ProfilePages/Mobile/OwnProfile';
import StrangerProfile from '../components/ProfilePages/Mobile/StrangerProfile';
import Loading from '../components/Loading';
import useAuthContext from '../hooks/useAuthContext';
import { getProfile, profileRequest } from '../api/profile';
import usePosts from '../hooks/usePosts';

function ProfilePage({ isMobile }: { isMobile: boolean }) {
  const { id } = useParams() as { id: string };
  const [relationshipStatus, setRelationshipStatus] = useState<{
    status: TProfileFriend | null;
    request: TFriendStatus;
  }>({ status: null, request: 'request' });
  const auth = useAuthContext();

  const { data, isLoading, isError, error } = useQuery<TProfile, Error>({
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

  const checkStatus = useCallback(
    (profileFriendStatus: TProfileFriend) => {
      if (
        profileFriendStatus.status === 'Accepted' ||
        (profileFriendStatus.status === 'Pending' &&
          profileFriendStatus.friend === auth.user?._id)
      ) {
        return 'reject';
      }
      return 'accept';
    },
    [auth.user]
  );

  const requestMutation = useMutation({
    mutationFn: () => {
      const reqId = relationshipStatus.status
        ? relationshipStatus.status._id
        : id;
      return profileRequest(reqId, relationshipStatus.request);
    },
    onSuccess(successData) {
      setRelationshipStatus({
        status: successData,
        request: successData ? checkStatus(successData) : 'request',
      });
    },
    onError(errorData: Error) {
      // handle error
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      const { friendStatus } = data;
      if (friendStatus) {
        const currentReq = checkStatus(friendStatus);
        setRelationshipStatus({
          status: friendStatus,
          request: currentReq,
        });
      }
    }
  }, [checkStatus, data, isLoading, isError]);

  const { posts, mutationReactPost, mutationCreatePost, mutationDeletePost } =
    usePosts({ postsType: 'profile', id, handleScroll: true });

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
    return isMobile ? (
      <OwnProfile
        profile={data}
        postsProps={{
          posts,
          mutationCreatePost,
          mutationReactPost,
          mutationDeletePost,
        }}
      />
    ) : (
      <p>Desktop Profile</p>
    );
  }

  return isMobile ? (
    <StrangerProfile
      profileProps={{
        profile: data,
        requestMutation: () => requestMutation.mutate(),
        friendStatus: relationshipStatus.status,
      }}
      postsProps={{ posts, mutationReactPost }}
    />
  ) : (
    <p>Desktop Profile</p>
  );
}

export default ProfilePage;
