import { useEffect, useState } from 'react';
import {
  acceptRequest,
  rejectRequest,
  sendRequest,
} from '../../../api/profile';
import useAuthContext from '../../../hooks/useAuthContext';
import { TProfile, TProfileFriend } from '../../../types/Profile';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';

function StangerProfile({ data }: { data: TProfile }) {
  const [currentPage, setCurrentPage] = useState<string>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [friendStatus, setFriendStatus] = useState<TProfileFriend | null>(null);

  const pages = ['Posts', 'About', 'Photos', 'Videos', 'Mentions'];
  const auth = useAuthContext();

  async function handleRequest() {
    try {
      const res = await sendRequest(data._id);
      setFriendStatus(res);
    } catch (err: any) {
      setRequestError(err.message);
    }
  }

  async function handleAcceptRequest() {
    if (friendStatus) {
      try {
        const res = await acceptRequest(friendStatus._id);
        setFriendStatus(res);
      } catch (err: any) {
        setRequestError(err.message);
      }
    }
  }

  async function handleCancelRequest() {
    if (friendStatus) {
      try {
        await rejectRequest(friendStatus._id);
        setFriendStatus(null);
      } catch (err: any) {
        setRequestError(err.message);
      }
    }
  }

  useEffect(() => {
    setFriendStatus(data.friendStatus);
  }, [data]);

  function getRequestButton() {
    if (friendStatus) {
      if (friendStatus.status === 'Accepted') {
        return (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-1 rounded-md grow"
            onClick={handleCancelRequest}
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
            onClick={handleCancelRequest}
          >
            Cancel Request
          </button>
        );
      }

      return (
        <button
          type="button"
          className="bg-green-500 text-white font-bold py-1 rounded-md grow"
          onClick={handleAcceptRequest}
        >
          Accept Friend Request
        </button>
      );
    }
    return (
      <button
        type="button"
        className="bg-blue-500 text-white font-bold py-1 rounded-md grow"
        onClick={handleRequest}
      >
        Add Friend
      </button>
    );
  }

  return (
    <div>
      <ProfileHeader fullName={data.fullName} />
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
    </div>
  );
}

export default StangerProfile;
