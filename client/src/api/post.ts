import {
  CreatePostRes,
  EmptyRes,
  GetPostCommentsRes,
  PostCommentRes,
  PostsRes,
  ReactToPostData,
  ReactToPostRes,
} from '../types/Api';
import { Comment, TDBPost } from '../types/Post';
import createReactionDetails from '../utils/createReactionDetails';
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

export async function getTimeline({
  pageParam = 0,
}): Promise<{ posts: TDBPost[]; nextCursor: number | null }> {
  const res = await fetch(`/api/v1/timeline?cursor=${pageParam}`);
  const { status, data, errors, message }: PostsRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function deletePost(postID: string) {
  const res = await fetch(`/api/v1/post/${postID}`, { method: 'DELETE' });
  const { status, data, errors, message }: EmptyRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postReact(
  postID: string,
  reaction: 'laugh' | 'heart' | 'like'
): Promise<ReactToPostData> {
  const res = await fetch(`/api/v1/post/${postID}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reaction }),
  });
  const { status, data, errors, message }: ReactToPostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function removePostReact(postID: string): Promise<null> {
  const res = await fetch(`/api/v1/post/${postID}/unlike`, {
    method: 'POST',
  });
  const { status, data, errors, message }: EmptyRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postComment(
  postID: string,
  comment: string
): Promise<Comment> {
  const res = await fetch(`/api/v1/post/${postID}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment }),
  });
  const { status, data, errors, message }: PostCommentRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function getPostComments(postID: string): Promise<Comment[]> {
  const res = await fetch(`/api/v1/post/${postID}/comments`);
  const { status, data, errors, message }: GetPostCommentsRes =
    await res.json();
  return getFinal(status, data, errors, message);
}
