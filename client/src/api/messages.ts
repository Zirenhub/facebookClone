import {
  CreateGroupRes,
  GetGroupsRes,
  GetMessagesRes,
  PostMessageRes,
} from '../types/Api';
import { TGroup } from '../types/Group';
import { TMessage } from '../types/Message';
import getFinal from './getError';

type TCreateGroup = {
  groupName: string;
  invited: string[];
};

export async function createGroup({
  groupName,
  invited,
}: TCreateGroup): Promise<TGroup> {
  const res = await fetch(`/api/v1/messages/group`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupName, invited }),
  });
  const { status, data, errors, message }: CreateGroupRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function getGroups(): Promise<TGroup[]> {
  const res = await fetch(`/api/v1/messages/group`);
  const { status, data, errors, message }: GetGroupsRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postMessage(
  id: string,
  query: 'group' | 'private',
  messageContent: string
): Promise<null> {
  const res = await fetch(`/api/v1/messages/${query}/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: messageContent }),
  });
  const { status, data, errors, message }: PostMessageRes = await res.json();
  return getFinal(status, data, errors, message);
}

type TGetMessagesInfQuery = {
  pageParam?: any;
  id: string;
  query: 'private' | 'group';
};

export async function getMessages({
  pageParam = 0,
  id,
  query,
}: TGetMessagesInfQuery): Promise<{
  messages: TMessage[];
  nextCursor: number | null;
}> {
  const res = await fetch(
    `/api/v1/messages/${query}/${id}?cursor=${pageParam}`
  );
  const { status, data, errors, message }: GetMessagesRes = await res.json();
  return getFinal(status, data, errors, message);
}
