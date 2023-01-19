import { lazy, Suspense, useState } from 'react';
import pfp from '../../../assets/pfp.svg';
import pictures from '../../../assets/pictures.svg';
import feeling from '../../../assets/feeling.svg';
import camera from '../../../assets/camera.svg';
import location from '../../../assets/location.svg';
import Loading from '../../Loading';

const CreatePostModal = lazy(() => import('./CreatePost'));

function WritePost() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    useState<boolean>(false);

  if (isCreatePostModalOpen) {
    return (
      <Suspense fallback={<Loading />}>
        <CreatePostModal close={() => setIsCreatePostModalOpen(false)} />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-2 py-4">
        <div>
          <img src={pfp} alt="profile" className="max-w-[48px]" />
        </div>
        <div className="grow px-3">
          <button
            type="button"
            className="px-5 py-2 min-w-full rounded-full bg-gray-200 text-start"
            onClick={() => setIsCreatePostModalOpen(true)}
          >
            What&apos;s on your mind?
          </button>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div>
            <img src={pictures} alt="photos" className="h-[32px]" />
          </div>
          <p className="text-sm">Photo</p>
        </div>
      </div>
      <div className="flex justify-around pb-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={feeling} alt="feeling" className="block m-auto w-[24px]" />
          <p>Feeling</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={camera} alt="video" className="block m-auto w-[21px]" />
          <p>Video</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={location}
            alt="location"
            className="block m-auto w-[21px]"
          />
          <p>Location</p>
        </div>
      </div>
    </div>
  );
}

export default WritePost;
