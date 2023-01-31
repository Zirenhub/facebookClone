import { useEffect, useState } from 'react';
import {
  acceptRequest,
  rejectRequest,
  sendRequest,
} from '../../../api/profile';
import useAuthContext from '../../../hooks/useAuthContext';
import { TProfile } from '../../../types/Profile';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';

function StangerProfile({ data }: { data: TProfile }) {
  const [currentPage, setCurrentPage] = useState<string>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [friendStatus, setFriendStatus] = useState<string | null>(null);

  const pages = ['Posts', 'About', 'Photos', 'Videos', 'Mentions'];
  const auth = useAuthContext();

  async function handleRequest() {
    try {
      await sendRequest(data._id);
      setFriendStatus('requested');
    } catch (err: any) {
      setRequestError(err.message);
    }
  }

  async function handleAcceptRequest() {
    if (data.friendStatus) {
      try {
        await acceptRequest(data.friendStatus._id);
        setFriendStatus('friends');
      } catch (err: any) {
        setRequestError(err.message);
      }
    }
  }

  async function handleCancelRequest() {
    if (data.friendStatus) {
      try {
        await rejectRequest(data.friendStatus._id);
        setFriendStatus(null);
      } catch (err: any) {
        setRequestError(err.message);
      }
    }
  }

  useEffect(() => {
    if (data.friendStatus) {
      // if the status is pending check who is requesting.
      if (data.friendStatus.status === 'Pending') {
        if (data.friendStatus.friend !== auth.user?._id) {
          setFriendStatus('request');
        } else {
          setFriendStatus('requested');
        }
      } else if (data.friendStatus.status === 'Accepted') {
        setFriendStatus('friends');
      }
    }
  }, [data, auth]);

  return (
    <div>
      <ProfileHeader fullName={data.fullName} />
      {requestError && (
        <Popup msg={requestError} close={() => setRequestError(null)} />
      )}
      <div className="flex gap-2 p-2">
        {friendStatus === 'request' && (
          <button
            type="button"
            className="bg-green-500 text-white font-bold py-1 rounded-md grow"
            onClick={handleAcceptRequest}
          >
            Accept Friend Request
          </button>
        )}
        {friendStatus === 'requested' && (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-1 rounded-md grow"
            onClick={handleCancelRequest}
          >
            Cancel request
          </button>
        )}
        {friendStatus === 'friends' && (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-1 rounded-md grow"
          >
            Unfriend
          </button>
        )}
        {!friendStatus && (
          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-1 rounded-md grow"
            onClick={handleRequest}
          >
            Add Friend
          </button>
        )}
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
