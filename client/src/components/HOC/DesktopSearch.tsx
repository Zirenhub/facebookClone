/* eslint-disable jsx-a11y/no-autofocus */
import Back from '../../assets/back.svg';
import Search from '../../assets/search.svg';
import FLogo from '../../assets/f-logo.svg';
import useSearch from '../../hooks/useSearch';
import ProfileCards from '../ProfilePages/ProfileCards';

type Props = {
  isOpen: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

function DesktopSearch({ isOpen, setSearch }: Props) {
  const { searchResults, handleSearch, error } = useSearch();

  if (isOpen) {
    return (
      <div className="absolute flex flex-col bg-white z-20 shadow-lg left-0 top-0 p-2 rounded-lg">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => setSearch(false)}
            className="h-full w-10 p-2 rounded-full hover:bg-gray-200 transition-all"
          >
            <Back height="100%" width="100%" fill="gray" />
          </button>
          <div className="flex relative">
            <div className="h-full w-7 absolute left-2 top-0">
              <Search width="100%" height="100%" stroke="gray" />
            </div>
            <input
              placeholder="Search Facebook"
              autoFocus
              onInput={(e: React.SyntheticEvent) => {
                const target = e.target as HTMLInputElement;
                handleSearch(target.value);
              }}
              className="p-2 bg-gray-100 rounded-full w-[64px] md:w-auto pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <h1 className="font-bold text-lg">Recent searches</h1>
          {error && <p>{error}</p>}
          <ProfileCards
            profiles={searchResults || []}
            onClick={() => setSearch(false)}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="h-full w-10">
        <FLogo height="100%" width="100%" />
      </div>
      <div className="flex grow relative">
        <div className="h-full w-7 absolute left-2 top-0">
          <Search width="100%" height="100%" stroke="gray" />
        </div>
        <input
          placeholder="Search Facebook"
          onClick={() => setSearch(true)}
          className="p-2 bg-gray-100 rounded-full w-[64px] md:w-auto pl-10"
        />
      </div>
    </>
  );
}

export default DesktopSearch;
