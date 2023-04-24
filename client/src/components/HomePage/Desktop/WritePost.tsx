import Pfp from '../../../assets/pfp-two.svg';
import useAuthContext from '../../../hooks/useAuthContext';

function WritePost({
  openCreatePostModal,
}: {
  openCreatePostModal: () => void;
}) {
  const auth = useAuthContext();

  return (
    <div className="flex gap-2">
      <div className="w-12">
        <Pfp height="100%" width="100%" fill="gray" />
      </div>
      <button
        type="button"
        onClick={() => openCreatePostModal()}
        className="rounded-full text-lg text-dimGray text-start px-3 grow bg-gray-100 hover:bg-gray-200"
      >
        What&apos;s on your mind, {auth.user?.firstName}?
      </button>
    </div>
  );
}

export default WritePost;
