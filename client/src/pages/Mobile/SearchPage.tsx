import { useNavigate } from 'react-router-dom';
import BackButton from '../../assets/back.svg';
import Pfp from '../../assets/pfp-two.svg';
import useSearch from '../../hooks/useSearch';

function SearchPage({ close }: { close: () => void }) {
  const { searchResults, handleSearch, error } = useSearch();
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <header className="flex gap-2 border-b-2 mb-3 pb-3">
        <button type="button" onClick={close} className="h-8 w-8">
          <BackButton height="100%" width="100%" />
        </button>
        <div className="grow">
          <input
            type="text"
            placeholder="Search"
            onInput={(e: React.SyntheticEvent) => {
              const target = e.target as HTMLInputElement;
              handleSearch(target.value);
            }}
            className="bg-gray-200 rounded-full h-full w-full pl-4"
          />
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {error && <p>{error}</p>}
        {searchResults &&
          searchResults.map((result) => {
            return (
              <button
                key={result._id}
                type="button"
                onClick={() => {
                  close();
                  navigate(`/${result._id}`);
                }}
                className="bg-gray-200 p-3 rounded-lg flex items-center gap-4 w-full"
              >
                <div className="h-12 w-12">
                  <Pfp height="100%" width="100%" />
                </div>
                <p className="font-bold">{result.fullName}</p>
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
