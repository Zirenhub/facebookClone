import { lazy, Suspense, useState } from 'react';
import Pfp from '../../../assets/pfp-two.svg';
import Pictures from '../../../assets/pictures.svg';
import Loading from '../../Loading';

const CreatePostModal = lazy(() => import('../../HomePage/Mobile/CreatePost'));

function OwnProfilePosts() {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  if (openCreatePost) {
    return (
      <Suspense fallback={<Loading />}>
        <CreatePostModal close={() => setOpenCreatePost(false)} />
      </Suspense>
    );
  }

  return (
    <div className="p-2">
      <div className="flex flex-col border-b-4">
        <p className="font-bold">Details</p>
        <p className="text-dimGray">No details avalible</p>
        <div className="flex flex-col gap-2 pt-2 pb-2">
          <button type="button" className="self-start">
            ... See your About Info
          </button>
          <button
            type="button"
            className="bg-blue-100 text-blue-500 rounded-md py-1"
          >
            Edit public details
          </button>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Friends</p>
          <button type="button" className="text-blue-500">
            Find Friends
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">Posts</p>
        <div className="flex gap-2">
          <div className="h-10 w-10">
            <Pfp height="100%" width="100%" />
          </div>
          <button
            type="button"
            className="rounded-full p-2 border-2 grow"
            onClick={() => setOpenCreatePost(true)}
          >
            What&apos;s on your mind?
          </button>
          <div className="h-10 w-10">
            <Pictures height="100%" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnProfilePosts;
