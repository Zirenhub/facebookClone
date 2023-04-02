import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import { TRequest } from '../../types/Request';
import Pfp from '../../assets/pfp-two.svg';
import { acceptRequest, rejectRequest, getRequests } from '../../api/profile';

function FriendsRequests() {
  const navigate = useNavigate();

  const { isLoading, isError, data, error, refetch } = useQuery<
    TRequest[],
    Error
  >({
    queryKey: ['requests'],
    queryFn: () => getRequests(),
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (reqID: string) => {
      return acceptRequest(reqID);
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: (reqID: string) => {
      return rejectRequest(reqID);
    },
  });
  // fix this later, switch to onSuccess
  if (acceptRequestMutation.isSuccess || rejectRequestMutation.isSuccess) {
    refetch();
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      {(acceptRequestMutation.isError || rejectRequestMutation.isError) && (
        <p>An error occurred</p>
      )}
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
                onClick={() => acceptRequestMutation.mutate(request._id)}
              >
                ACCEPT
              </button>
              <button
                type="button"
                className="bg-red-300 rounded-lg px-2 font-bold"
                onClick={() => rejectRequestMutation.mutate(request._id)}
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
