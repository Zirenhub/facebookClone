import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TProfileWithoutFullName } from '../../types/Profile';
import BackButton from '../../assets/back.svg';
import Pfp from '../../assets/pfp-two.svg';

function SearchPage({ close }: { close: () => void }) {
  const [searchResults, setSearchResults] = useState<
    TProfileWithoutFullName[] | null
  >(null);

  const navigate = useNavigate();

  async function handleSearch(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      const res = await fetch(`/api/v1/search/profile/${target.value}`, {
        method: 'POST',
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setSearchResults(resData.data);
      }
    } else {
      setSearchResults(null);
    }
  }

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
            onInput={handleSearch}
            className="bg-gray-200 rounded-full h-full w-full pl-4"
          />
        </div>
      </header>
      {searchResults &&
        searchResults.map((result) => {
          return (
            <button
              key={result._id}
              type="button"
              onClick={() => navigate(`/${result._id}`, { replace: true })}
              className="bg-gray-200 p-3 rounded-lg flex items-center gap-4 w-full"
            >
              <div className="h-12 w-12">
                <Pfp height="100%" width="100%" />
              </div>
              <p className="font-bold">
                {result.firstName} {result.lastName}
              </p>
            </button>
          );
        })}
    </div>
  );
}

export default SearchPage;
