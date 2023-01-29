import useAuthContext from '../../../hooks/useAuthContext';
import Pfp from '../../../assets/pfp-two.svg';
import Back from '../../../assets/back.svg';

function CreatePost({ close }: { close: () => void }) {
  const auth = useAuthContext();

  function handleSubmit() {}

  return (
    <div className="z-10 absolute bg-white top-0 left-0 h-full w-full">
      <header className="flex justify-between p-3 border-b-2">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={close}>
            <Back />
          </button>
          <p className="font-bold">Create post</p>
        </div>
        <div>
          <button type="button" className="text-blue-600 font-bold">
            POST
          </button>
        </div>
      </header>
      <div className="flex flex-col">
        <div className="flex gap-2 p-3">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p>{auth.user?.fullName}</p>
            <p>FRIENDS OR PUBLIC HERE</p>
          </div>
        </div>
        <div className="px-2">
          <textarea
            className="border-2 w-full min-h-[50px] h-24 max-h-28"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <p>Background pick here</p>
      <div className="px-3">
        <button
          type="button"
          className="py-2 bg-blue-500 text-white font-bold w-full"
          onClick={handleSubmit}
        >
          POST
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
