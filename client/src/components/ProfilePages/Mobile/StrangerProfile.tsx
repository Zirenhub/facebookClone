import { useState } from 'react';
import { sendRequest } from '../../../api/profile';
import { TProfile } from '../../../types/Profile';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';

function StangerProfile({ data }: { data: TProfile }) {
  const [currentPage, setCurrentPage] = useState<string>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);

  const pages = ['Posts', 'About', 'Photos', 'Videos', 'Mentions'];

  async function handleRequest() {
    try {
      await sendRequest(data._id);
    } catch (err: any) {
      setRequestError(err.message);
    }
  }

  return (
    <div>
      <ProfileHeader fullName={data.fullName} />
      {requestError && (
        <Popup msg={requestError} close={() => setRequestError(null)} />
      )}
      <div className="flex flex-col p-2 border-b-4 border-gray-300">
        <p>followers following</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-1 rounded-md grow"
          >
            Message
          </button>
          <button
            type="button"
            className="bg-gray-300 px-3 rounded-md font-bold"
            onClick={handleRequest}
          >
            +
          </button>
          <button
            type="button"
            className="bg-gray-300 px-3 rounded-md font-bold"
          >
            ...
          </button>
        </div>
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
