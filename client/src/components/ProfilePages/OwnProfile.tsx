import { lazy, Suspense, useState } from 'react';
import { TProfile } from '../../types/Profile';
import pfp from '../../assets/pfp.svg';
import pictures from '../../assets/pictures.svg';
import Loading from '../Loading';
import ProfileHeader from './ProfileHeader';

const CreatePostModal = lazy(() => import('../HomePage/Mobile/CreatePost'));

function OwnProfile({ data }: { data: TProfile }) {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  if (openCreatePost) {
    return (
      <Suspense fallback={<Loading />}>
        <CreatePostModal close={() => setOpenCreatePost(false)} />
      </Suspense>
    );
  }

  return (
    <div>
      <ProfileHeader fullName={data.fullName} />
      <div className="flex flex-col border-b-2 p-2">
        <div className="flex justify-between gap-2">
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
        <div className="py-4">
          <button type="button" className="bg-gray-300 rounded-full px-3">
            See more about yourself
          </button>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Friends</p>
          <button type="button" className="text-blue-500">
            Find Friends
          </button>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="pb-2">
          <button
            type="button"
            className="font-bold px-4 bg-gray-300 rounded-full"
          >
            Photos
          </button>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Posts</p>
          <div className="flex gap-2">
            <img src={pfp} alt="profile" className="w-10 h-10" />
            <button
              type="button"
              className="rounded-full p-2 bg-gray-200 grow"
              onClick={() => setOpenCreatePost(true)}
            >
              Post a status update
            </button>
            <img src={pictures} alt="pictures" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnProfile;
