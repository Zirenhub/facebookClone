import { GetSearchRes } from '../types/Api';
import { TProfileDefault } from '../types/Profile';
import getFinal from './getError';

async function getSearchResults(query: string): Promise<TProfileDefault[]> {
  const res = await fetch(`/api/v1/search/profile/${query}`, {
    method: 'POST',
  });
  const { status, data, errors, message }: GetSearchRes = await res.json();
  return getFinal(status, data, errors, message);
}

export default getSearchResults;
