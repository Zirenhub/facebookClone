import { useState } from 'react';
import { TProfileDefault } from '../types/Profile';
import getSearchResults from '../api/search';

function useSearch() {
  const [searchResults, setSearchResults] = useState<TProfileDefault[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(query: string) {
    try {
      setError(null);
      if (query) {
        const res = await getSearchResults(query);
        setSearchResults(res);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return { searchResults, handleSearch, error };
}

export default useSearch;
