import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../../api/profile';
import Loading from '../../components/Loading';
import { TRequest } from '../../types/Requests';
import Search from '../../assets/search.svg';
import FriendsRequests from '../../components/Friends/FriendsRequests';

function Friends() {
  const [currentPage, setCurrentPage] = useState<string>('Requests');

  const pages = ['Requests', 'Your Friends'];

  const { isLoading, isError, data, error } = useQuery<TRequest[], Error>({
    queryKey: ['friends'],
    queryFn: () => getRequests(),
  });

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
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="font-bold text-3xl">Friends</p>
        <div className="h-8 w-8 bg-gray-300 rounded-full">
          <Search height="100%" width="100%" />
        </div>
      </div>
      <div className="flex gap-2">
        {pages.map((page) => {
          return (
            <button
              key={page}
              type="button"
              className={`rounded-full px-2 py-1 ${
                currentPage === page ? 'bg-green-300' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        {currentPage === 'Requests' && <FriendsRequests data={data} />}
      </div>
    </div>
  );
}

export default Friends;
