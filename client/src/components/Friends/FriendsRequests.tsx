import { TRequest } from '../../types/Requests';
import Pfp from '../../assets/pfp-two.svg';
import { useNavigate } from 'react-router-dom';

function FriendsRequests({ data }: { data: TRequest[] }) {
  const navigate = useNavigate();

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
              >
                ACCEPT
              </button>
              <button
                type="button"
                className="bg-red-300 rounded-lg px-2 font-bold"
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
