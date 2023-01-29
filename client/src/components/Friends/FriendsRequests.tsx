import { useNavigate } from 'react-router-dom';
import { TRequest } from '../../types/Requests';
import Pfp from '../../assets/pfp-two.svg';
import { acceptRequest } from '../../api/profile';

function FriendsRequests({ data }: { data: TRequest[] }) {
  const navigate = useNavigate();

  async function handleAcceptRequest(reqID: string) {
    try {
      await acceptRequest(reqID);
    } catch (err) {
      console.log(err);
    }
  }
  function handleRejectRequest(reqID: string) {}

  return (
    <>
      {data.map((request) => {
        return (
          <div
            key={request._id}
            className="flex justify-between bg-gray-200 rounded-lg p-2"
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
                onClick={() => handleAcceptRequest(request._id)}
              >
                ACCEPT
              </button>
              <button
                type="button"
                className="bg-red-300 rounded-lg px-2 font-bold"
                onClick={() => handleAcceptRequest(request._id)}
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
