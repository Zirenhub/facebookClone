/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import {
  MutationReactPost,
  TOwnProfileMutations,
  TProfile,
  TProfileFriend,
  TStrangerProfileMutations,
} from '../types/Profile';
import Loading from '../components/Loading';
import useAuthContext from '../hooks/useAuthContext';
import { getProfile, profileRequest } from '../api/profile';
import usePosts from '../hooks/usePosts';

const ProfileDesktop = React.lazy(
  () => import('../components/ProfilePages/Desktop/Profile')
);
const OwnProfileMobile = React.lazy(
  () => import('../components/ProfilePages/Mobile/OwnProfile')
);
const StrangerProfileMobile = React.lazy(
  () => import('../components/ProfilePages/Mobile/StrangerProfile')
);

function ProfilePage({ isMobile }: { isMobile: boolean }) {
  const { id } = useParams() as { id: string };
  const [profile, setProfile] = useState<TProfile | null>(null);
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
    onSuccess(successData) {
      setProfile(successData);
    },
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
      if (profile) {
        const { friendStatus } = profile;
        if (friendStatus) {
          return profileRequest(friendStatus._id, checkStatus(friendStatus));
        }
        return profileRequest(profile._id, 'request');
      }
      throw new Error('Profile was not found');
    },
    onSuccess(successData) {
      if (profile) {
        setProfile({ ...profile, friendStatus: successData });
      }
    },
    onError(errorData: Error) {
      // handle error
    },
  });

  const {
    posts,
    mutationReactPost,
    mutationCreatePost,
    mutationDeletePost,
    handleScroll,
  } = usePosts({ postsType: 'profile', id });

  useEffect(() => {
    const container = document.querySelector('main');
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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

  const isMe = data._id === auth.user?._id;
  const props: {
    ownProfile: TOwnProfileMutations;
    strangerProfile: TStrangerProfileMutations;
    mutationReactPost: MutationReactPost;
  } = {
    ownProfile: {
      mutationCreatePost,
      mutationDeletePost,
    },
    strangerProfile: {
      requestMutation: () => requestMutation.mutate(),
    },
    mutationReactPost,
  };

  function getProfilePage() {
    if (profile) {
      if (isMobile) {
        return isMe ? (
          <OwnProfileMobile
            profile={profile}
            posts={posts}
            mutations={props.ownProfile}
          />
        ) : (
          <StrangerProfileMobile
            profile={profile}
            posts={posts}
            mutations={props.strangerProfile}
          />
        );
      }
      return (
        <ProfileDesktop
          profile={profile}
          posts={posts}
          isMe={isMe}
          mutations={props}
        />
      );
    }
    return <p className="text-center">Something went wrong</p>;
  }

  return <Suspense fallback={<Loading />}>{getProfilePage()}</Suspense>;
}

export default ProfilePage;
