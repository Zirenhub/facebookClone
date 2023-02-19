import {
  CreatePostRes,
  EmptyRes,
  PostsRes,
  ReactToPostRes,
} from '../types/Api';
import { TDBPost } from '../types/Post';
import getFinal from './getError';

export async function postImage(
  content: string,
  image: File,
  audience: string
): Promise<TDBPost> {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('audience', audience);
  formData.append('image', image);
  formData.append('type', 'image');
  const res = await fetch('/api/v1/post', {
    method: 'POST',
    body: formData,
  });
  const { status, data, errors, message }: CreatePostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postDefault(
  content: string,
  background: string | null,
  audience: string
): Promise<TDBPost> {
  const res = await fetch('/api/v1/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, background, audience, type: 'default' }),
  });
  const { status, data, errors, message }: CreatePostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function getPosts(): Promise<TDBPost[]> {
  const res = await fetch('/api/v1/timeline');
  const { status, data, errors, message }: PostsRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function deletePost(postID: string) {
  const res = await fetch(`/api/v1/post/${postID}/delete`, { method: 'POST' });
  const { status, data, errors, message }: EmptyRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postReact(
  postID: string,
  reaction: 'laugh' | 'heart' | 'like'
) {
  const res = await fetch(`/api/v1/post/${postID}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reaction }),
  });
  const { status, data, errors, message }: ReactToPostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function removePostReact(postID: string) {
  const res = await fetch(`/api/v1/post/${postID}/unlike`, {
    method: 'POST',
  });
  const { status, data, errors, message }: EmptyRes = await res.json();
  return getFinal(status, data, errors, message);
}
