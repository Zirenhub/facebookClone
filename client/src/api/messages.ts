import {
  CreateGroupRes,
  GetGroupMessagesRes,
  GetGroupsRes,
  GetMessagesRes,
  SendGroupMessageRes,
  SendMessageRes,
} from '../types/Api';
import { TGroup } from '../types/Group';
import { TMessage } from '../types/Message';
import getFinal from './getError';

export async function getPrivateMessages(
  partnerID: string
): Promise<TMessage[]> {
  const res = await fetch(`/api/v1/messages/privte/${partnerID}`);
  const { status, data, errors, message }: GetMessagesRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function sendPrivateMessage(
  receiver: string,
  messageContent: string
): Promise<TMessage> {
  const res = await fetch('/api/v1/messages/private', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiver, message: messageContent }),
  });
  const { status, data, errors, message }: SendMessageRes = await res.json();
  return getFinal(status, data, errors, message);
}

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

export async function sendGroupMessage(
  groupID: string,
  messageContent: string
): Promise<null> {
  const res = await fetch(`/api/v1/messages/group/${groupID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageContent }),
  });
  const { status, data, errors, message }: SendGroupMessageRes =
    await res.json();
  return getFinal(status, data, errors, message);
}

export async function getGroupMessages(groupID: string): Promise<TMessage[]> {
  const res = await fetch(`/api/v1/messages/group/${groupID}`);
  const { status, data, errors, message }: GetGroupMessagesRes =
    await res.json();
  return getFinal(status, data, errors, message);
}
