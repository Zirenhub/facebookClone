import { TDBPost } from '../types/Post';
import Back from '../assets/back.svg';

function FullPost({ data, close }: { data: TDBPost; close: () => void }) {
  return (
    <div className="z-10 absolute bg-white h-full w-full top-0 left-0 p-2">
      <header className="flex items-center">
        <button type="button" onClick={close} className="w-8 h-8">
          <Back height="100%" width="100%" />
        </button>
        <p className="items-center">{data.author.fullName}</p>
      </header>
    </div>
  );
}

export default FullPost;
