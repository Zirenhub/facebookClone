import { lazy, Suspense, useState } from 'react';
import pfp from '../../../assets/pfp.svg';
import Loading from '../../Loading';

const CreatePostModal = lazy(() => import('./CreatePost'));

function WritePost() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    useState<boolean>(false);

  return (
    <div className="flex items-center px-2 py-4">
      {isCreatePostModalOpen && (
        <Suspense fallback={<Loading />}>
          <CreatePostModal />
        </Suspense>
      )}
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
      <div className="flex flex-col items-center">
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <p className="text-sm">Photo</p>
      </div>
    </div>
  );
}

export default WritePost;
