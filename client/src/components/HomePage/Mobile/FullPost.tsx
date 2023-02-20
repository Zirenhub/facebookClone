import { TDBPost } from '../../../types/Post';
import Back from '../../../assets/back.svg';
import Search from '../../../assets/search.svg';

function FullPost({ data, close }: { data: TDBPost; close: () => void }) {
  return (
    <div className="z-10 absolute bg-white h-full w-full top-0 left-0 p-2">
      <header className="flex items-center justify-between">
        <button type="button" onClick={close} className="w-8 h-8">
          <Back height="100%" width="100%" />
        </button>
        <p>{data.author.fullName}</p>
        <button type="button" className="w-8 h-8">
          <Search height="100%" width="100%" />
        </button>
      </header>
      <div />
    </div>
  );
}

export default FullPost;
