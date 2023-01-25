import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TProfile } from '../types/Profile';
import getProfile from '../api/profile';
import Loading from '../components/Loading';
import BackButton from '../components/utils/BackButton';
import pfp from '../assets/pfp.svg';
import pictures from '../assets/pictures.svg';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery<TProfile, Error>({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>404</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex p-3 border-b-2">
        <BackButton
          close={() => {
            navigate('/home');
          }}
        />
        <p className="font-bold">
          {data.firstName} {data.lastName}
        </p>
      </header>
      <div className="w-full h-36 bg-gray-300" />
      <div className="p-2 flex flex-col border-b-2">
        <div className="absolute flex flex-col top-32">
          <img
            src={pfp}
            alt="profile"
            className="w-32 h-32 bg-gray-500 rounded-full"
          />
          <p className="font-bold text-2xl">
            {data.firstName} {data.lastName}
          </p>
        </div>
        <div className="flex mt-24 justify-between gap-2">
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
          <button type="button" className="flex">
            ... See more about yourself
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
            <button type="button" className="rounded-full p-2 bg-gray-200 grow">
              Post a status update
            </button>
            <img src={pictures} alt="pictures" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
