import { useState } from 'react';
import { TProfile } from '../../../types/Profile';
import OwnProfilePosts from './OwnProfilePosts';
import ProfileHeader from './ProfileHeader';

function OwnProfile({ data }: { data: TProfile }) {
  const [currentPage, setCurrentPage] = useState<string>('Posts');

  return (
    <>
      <ProfileHeader fullName={data.fullName} />
      <div className="flex flex-col border-b-2 p-2">
        <div className="flex justify-between gap-2 border-b-8 border-gray-300 pb-4">
          <button
            type="button"
            className="flex items-center justify-center bg-blue-500 text-white py-1 font-bold rounded-md grow"
          >
            Add to story
          </button>
          <button
            type="button"
            className="bg-gray-300 font-bold rounded-md grow"
          >
            Edit profile
          </button>
          <button
            type="button"
            className="bg-gray-300 font-bold rounded-md grow"
          >
            ...
          </button>
        </div>
        <div className="flex gap-4 pt-3">
          <button
            type="button"
            className={`${
              currentPage === 'Posts' &&
              'text-blue-600 bg-blue-100 rounded-full px-2'
            } font-bold`}
            onClick={() => setCurrentPage('Posts')}
          >
            Posts
          </button>
          <button
            type="button"
            className={`${
              currentPage === 'Reels' &&
              'text-blue-600 bg-blue-100 rounded-full px-2'
            } font-bold`}
            onClick={() => setCurrentPage('Reels')}
          >
            Reels
          </button>
        </div>
      </div>
      {currentPage === 'Posts' && <OwnProfilePosts />}
    </>
  );
}

export default OwnProfile;
