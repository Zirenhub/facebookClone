import Pfp from '../../../assets/pfp-two.svg';
import useAuthContext from '../../../hooks/useAuthContext';
/* eslint-disable react/no-array-index-key */

function WritePost({
  openCreatePostModal,
}: {
  openCreatePostModal: () => void;
}) {
  const auth = useAuthContext();
  const postTypes = ['Live video', 'Photo/video', 'Feeling/activity'];

  return (
    <div className="bg-white shadow-md flex flex-col rounded-lg p-3">
      <div className="flex gap-2">
        <div className="w-12">
          <Pfp height="100%" width="100%" fill="gray" />
        </div>
        <button
          type="button"
          onClick={openCreatePostModal}
          className="rounded-full text-lg text-dimGray text-start px-3 grow bg-gray-100 hover:bg-gray-200"
        >
          What&apos;s on your mind, {auth.user?.firstName}?
        </button>
      </div>
      <div className="h-px bg-gray-200 my-2" />
      <div className="flex text-dimGray">
        {postTypes.map((b, i) => {
          return (
            <button
              type="button"
              className="p-3 grow font-bold rounded-lg hover:bg-gray-100"
              key={i}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WritePost;
