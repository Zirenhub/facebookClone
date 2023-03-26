import { GetOnlineFrindsRes } from '../types/Api';
import getFinal from './getError';

async function getOnlineFriends(): Promise<string[]> {
  const res = await fetch('/api/v1/online-friends');
  const { status, data, errors, message }: GetOnlineFrindsRes =
    await res.json();
  return getFinal(status, data, errors, message);
}

export default getOnlineFriends;
