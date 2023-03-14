import { GetMessagesRes } from '../types/Api';
import TMessage from '../types/Message';
import getFinal from './getError';

export default async function getMessages(
  partnerID: string
): Promise<TMessage[]> {
  const res = await fetch(`/api/v1/messages/${partnerID}/`);
  const { status, data, errors, message }: GetMessagesRes = await res.json();
  return getFinal(status, data, errors, message);
}
