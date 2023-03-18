import { GetMessagesRes, SendMessageRes } from '../types/Api';
import TMessage from '../types/Message';
import getFinal from './getError';

export async function getMessages(partnerID: string): Promise<TMessage[]> {
  const res = await fetch(`/api/v1/messages/${partnerID}/`);
  const { status, data, errors, message }: GetMessagesRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function sendMessage(
  receiver: string,
  messageContent: string
): Promise<TMessage> {
  const res = await fetch('/api/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiver, message: messageContent }),
  });
  const { status, data, errors, message }: SendMessageRes = await res.json();
  return getFinal(status, data, errors, message);
}
