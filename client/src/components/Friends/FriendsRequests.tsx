import { QueryObserverResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TRequest } from '../../types/Request';
import Pfp from '../../assets/pfp-two.svg';
import { acceptRequest, rejectRequest } from '../../api/profile';

function FriendsRequests({
  data,
  refetch,
}: {
  data: TRequest[];
  refetch: () => Promise<QueryObserverResult>;
}) {
  const navigate = useNavigate();

  async function handleRequest(reqID: string, accept: boolean) {
    try {
      if (accept) {
        await acceptRequest(reqID);
      } else {
        await rejectRequest(reqID);
      }

      await refetch();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {data.map((request) => {
        return (
          <div
            key={request._id}
            className="flex justify-between bg-gray-200 rounded-lg p-2 shadow-md"
          >
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => navigate(`/${request.friend._id}`)}
            >
              <div className="h-10 w-10">
                <Pfp height="100%" width="100%" />
              </div>
              <p>{request.friend.fullName}</p>
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-green-300 rounded-lg px-2 font-bold"
                onClick={() => handleRequest(request._id, true)}
              >
                ACCEPT
              </button>
              <button
                type="button"
                className="bg-red-300 rounded-lg px-2 font-bold"
                onClick={() => handleRequest(request._id, false)}
              >
                DECLINE
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FriendsRequests;
