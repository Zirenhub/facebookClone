import { TDBPost } from '../types/Post';

type ValidationError = {
  location: string;
  msg: string;
  param: string;
  value: string;
};

type PostRes = {
  status: 'success' | 'error';
  data?: TDBPost;
  errors?: ValidationError[] | null;
  message: string | null;
};

type TimelinePosts = {
  status: 'success' | 'error';
  data?: TDBPost[];
  errors?: null;
  message: string | null;
};

function getFinal(
  status: 'success' | 'error',
  data: any,
  errors: ValidationError[] | null | undefined,
  message: string | null
) {
  if (status === 'success' && data) {
    return data;
  }
  if (status === 'error' && message) {
    return Promise.reject(new Error(message));
  }
  if (errors) {
    const errorsString = new Error(errors.map((e) => e.msg).join('\n'));
    return Promise.reject(errorsString);
  }
  return Promise.reject(new Error('Something went wrong'));
}

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
  const { status, data, errors, message }: PostRes = await res.json();
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
  const { status, data, errors, message }: PostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function getPosts(): Promise<TDBPost[]> {
  const res = await fetch('/api/v1/timeline');
  const { status, data, errors, message }: TimelinePosts = await res.json();
  return getFinal(status, data, errors, message);
}

export async function likePost(postID: string) {
  const res = await fetch(`/api/v1/post/${postID}/like`, { method: 'POST' });
  console.log(await res.json());

  // const { status, data, errors, message } = await res.json();
  // return getFinal(status, data, errors, message);
}

export async function unlikePost(postID: string) {
  const res = await fetch(`/api/v1/post/${postID}/unlike`, { method: 'POST' });
  console.log(await res.json());
}
