import {
  EmptyRes,
  GetFriendsRes,
  GetProfilePostsRes,
  GetProfileRes,
  GetRequestsRes,
  SendRequestRes,
} from '../types/Api';
import { TDBPost } from '../types/Post';
import {
  TFriendStatus,
  TProfile,
  TProfileDefault,
  TProfileFriend,
} from '../types/Profile';
import { TRequest } from '../types/Request';
import getFinal from './getError';

export async function getProfile(id: string): Promise<TProfile> {
  const res = await fetch(`/api/v1/profile/${id}`);
  const { status, data, errors, message }: GetProfileRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function getProfilePosts(
  id: string,
  pageParam: number
): Promise<{ posts: TDBPost[]; nextCursor: number | null }> {
  const res = await fetch(`/api/v1/profile/${id}/posts?cursor=${pageParam}`);
  const { status, data, errors, message }: GetProfilePostsRes =
    await res.json();
  return getFinal(status, data, errors, message);
}

export async function getRequests(): Promise<TRequest[]> {
  const res = await fetch(`/api/v1/profile/requests`);
  const { status, data, errors, message }: GetRequestsRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function profileRequest(
  id: string,
  req: TFriendStatus
): Promise<TProfileFriend | null> {
  // if req is 'send', id should be the profile id.
  // otherwise id should be the friend relationship id, TProfileFriend.
  const res = await fetch(`/api/v1/profile/${id}/${req}`, { method: 'POST' });
  // if req is 'reject', expect EmptyRes, data will be null.
  const { status, data, errors, message }: SendRequestRes | EmptyRes =
    await res.json();
  return getFinal(status, data, errors, message);
}

export async function getFriends(): Promise<TProfileDefault[]> {
  const res = await fetch('/api/v1/profile/friends');
  const { status, data, errors, message }: GetFriendsRes = await res.json();
  console.log(data);
  return getFinal(status, data, errors, message);
}
