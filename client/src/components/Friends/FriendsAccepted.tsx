import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFriends } from '../../api/profile';
import Loading from '../Loading';
import Pfp from '../../assets/pfp-two.svg';
import { TProfile } from '../../types/Profile';
/* eslint react/jsx-no-useless-fragment: 0 */

function FriendsAccepted() {
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery<TProfile[], Error>({
    queryKey: ['friends'],
    queryFn: () => getFriends(),
  });

  if (isLoading) {
    <Loading />;
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
      {data?.map((relationship) => {
        return (
          <button
            type="button"
            key={relationship._id}
            onClick={() => navigate(`/${relationship._id}`)}
            className="bg-gray-200 rounded-lg shadow-sm p-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <Pfp height="100%" width="100%" />
              </div>
              <p>{relationship.fullName}</p>
            </div>
          </button>
        );
      })}
    </>
  );
}

export default FriendsAccepted;
