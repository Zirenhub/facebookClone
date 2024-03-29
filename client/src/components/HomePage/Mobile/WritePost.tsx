import Pfp from '../../../assets/pfp-two.svg';
import Pictures from '../../../assets/pictures.svg';

function WritePost({
  openCreatePostModal,
}: {
  openCreatePostModal: () => void;
}) {
  return (
    <div className="flex items-center pb-2">
      <div className="w-12 rounded-full bg-gray-200">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="grow px-3">
        <button
          type="button"
          className="px-5 py-2 min-w-full rounded-full border-2 border-gray-300 text-start text-dimBlack"
          onClick={() => openCreatePostModal()}
        >
          What&apos;s on your mind?
        </button>
      </div>
      <div className="w-12">
        <Pictures width="100%" height="100%" fill="gray" />
      </div>
    </div>
  );
}

export default WritePost;
