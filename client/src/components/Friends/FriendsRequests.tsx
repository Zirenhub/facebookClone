import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import Pfp from '../../assets/pfp-two.svg';
import useRequests from '../../hooks/useRequests';

function FriendsRequests() {
  const navigate = useNavigate();

  const { requests, isLoading, isError, error, requestMutation } =
    useRequests();

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      {requestMutation.isError && <p>An error occurred</p>}
      {requests.length > 0 ? (
        requests.map((request) => {
          return (
            <div
              key={request._id}
              className="flex justify-between bg-white rounded-lg p-2 shadow-md"
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
                  onClick={() => requestMutation.mutate(request._id, 'accept')}
                >
                  ACCEPT
                </button>
                <button
                  type="button"
                  className="bg-red-300 rounded-lg px-2 font-bold"
                  onClick={() => requestMutation.mutate(request._id, 'reject')}
                >
                  DECLINE
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="font-bold text-dimGray text-center text-2xl">
          When you have friend requests or suggestions, you&apos;ll see them
          here.
        </p>
      )}
    </>
  );
}

export default FriendsRequests;
