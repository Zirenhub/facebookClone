import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  acceptRequest,
  getProfilePosts,
  rejectRequest,
  sendRequest,
} from '../../../api/profile';
import useAuthContext from '../../../hooks/useAuthContext';
import { TDBPost } from '../../../types/Post';
import { TProfile, TProfileFriend } from '../../../types/Profile';
import SingularPost from '../../HomePage/Mobile/SingularPost';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';

type TPages = 'Posts' | 'About' | 'Photos' | 'Videos' | 'Mentions';

function StangerProfile({ profileData }: { profileData: TProfile }) {
  const [currentPage, setCurrentPage] = useState<TPages>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [friendStatus, setFriendStatus] = useState<TProfileFriend | null>(null);

  const pages: readonly ['Posts', 'About', 'Photos', 'Videos', 'Mentions'] = [
    'Posts',
    'About',
    'Photos',
    'Videos',
    'Mentions',
  ];
  const auth = useAuthContext();

  const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
    queryKey: ['posts', profileData._id],
    queryFn: () => getProfilePosts(profileData._id),
    refetchOnWindowFocus: false,
  });

  async function handleRequest(status: 'send' | 'accept' | 'cancel') {
    try {
      let res = null;
      if (status === 'send') {
        res = await sendRequest(profileData._id);
      } else if (status === 'accept' && friendStatus) {
        res = await acceptRequest(friendStatus._id);
      } else if (status === 'cancel' && friendStatus) {
        res = await rejectRequest(friendStatus._id);
      }
      setFriendStatus(res);
    } catch (err: any) {
      setRequestError(err.message);
    }
  }

  useEffect(() => {
    setFriendStatus(profileData.friendStatus);
  }, [profileData]);

  function getRequestButton() {
    if (friendStatus) {
      if (friendStatus.status === 'Accepted') {
        return (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-1 rounded-md grow"
            onClick={() => handleRequest('cancel')}
          >
            Unfriend
          </button>
        );
      }
      if (
        friendStatus.status === 'Pending' &&
        friendStatus.friend === auth.user?._id
      ) {
        return (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-1 rounded-md grow"
            onClick={() => handleRequest('cancel')}
          >
            Cancel Request
          </button>
        );
      }

      return (
        <button
          type="button"
          className="bg-green-500 text-white font-bold py-1 rounded-md grow"
          onClick={() => handleRequest('accept')}
        >
          Accept Friend Request
        </button>
      );
    }
    return (
      <button
        type="button"
        className="bg-blue-500 text-white font-bold py-1 rounded-md grow"
        onClick={() => handleRequest('send')}
      >
        Add Friend
      </button>
    );
  }

  return (
    <div>
      <ProfileHeader fullName={profileData.fullName} />
      {requestError && (
        <Popup msg={requestError} close={() => setRequestError(null)} />
      )}
      <div className="flex gap-2 p-2">
        {getRequestButton()}
        <button
          type="button"
          className="bg-gray-200 text-black font-bold py-1 rounded-md grow"
        >
          Message
        </button>
        <button type="button" className="bg-gray-200 px-3 rounded-md font-bold">
          ...
        </button>
      </div>
      <div className="flex justify-between text-dimGray border-b-2">
        {pages.map((page) => {
          return (
            <button
              type="button"
              key={page}
              className={`p-2 ${currentPage === page ? 'text-blue-500' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      {currentPage === 'Posts' && data && (
        <div className="p-2">
          {data
            .sort(
              (a, b) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            )
            .map((post) => {
              return (
                <div
                  key={post._id}
                  className="mt-2 border-b-4 border-slate-400"
                >
                  <SingularPost post={post} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default StangerProfile;
