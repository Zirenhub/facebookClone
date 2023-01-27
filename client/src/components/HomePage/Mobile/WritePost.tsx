import { lazy, Suspense, useState } from 'react';
import pfp from '../../../assets/pfp.svg';
import pictures from '../../../assets/pictures.svg';
import Loading from '../../Loading';

const CreatePostModal = lazy(() => import('./CreatePost'));

function WritePost() {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  if (openCreatePost) {
    return (
      <Suspense fallback={<Loading />}>
        <CreatePostModal close={() => setOpenCreatePost(false)} />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-2">
        <div>
          <img src={pfp} alt="profile" className="w-pfp" />
        </div>
        <div className="grow px-3">
          <button
            type="button"
            className="px-5 py-2 min-w-full rounded-full border-2 border-gray-300 text-start"
            onClick={() => setOpenCreatePost(true)}
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
    </div>
  );
}

export default WritePost;
