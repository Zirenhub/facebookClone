import { useState } from 'react';
import FriendsAccepted from '../../components/Friends/FriendsAccepted';
import FriendsRequests from '../../components/Friends/FriendsRequests';
import Search from '../../assets/search.svg';

function Friends() {
  const [currentPage, setCurrentPage] = useState<string>('Requests');

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="font-bold text-3xl">Friends</p>
        <div className="h-8 w-8 bg-gray-300 rounded-full">
          <Search height="100%" width="100%" />
        </div>
      </div>
      <div className="flex gap-2">
        {['Requests', 'Your Friends'].map((page) => {
          return (
            <button
              key={page}
              type="button"
              className={`rounded-full px-2 py-1 ${
                currentPage === page ? 'bg-green-400' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {currentPage === 'Requests' ? <FriendsRequests /> : <FriendsAccepted />}
      </div>
    </div>
  );
}

export default Friends;
