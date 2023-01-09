import pfp from '../../../assets/pfp.svg';

function WritePost() {
  return (
    <div className="flex items-center px-2 py-4">
      <div>
        <img src={pfp} alt="profile" className="max-w-[48px]" />
      </div>
      <div className="grow px-3">
        <button
          type="button"
          className="px-5 py-2 min-w-full rounded-full bg-gray-200 text-start"
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
