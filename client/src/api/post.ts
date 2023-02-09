import { ImagePost, DefaultPost } from '../types/Post';

type Errors = {
  location: string;
  msg: string;
  param: string;
  value: string;
};

type ImagePostRes = {
  status: 'success' | 'error';
  data?: ImagePost;
  errors?: Errors[] | null;
  message: string | null;
};

type DefaultPostRes = {
  status: 'success' | 'error';
  data?: DefaultPost;
  errors?: Errors[] | null;
  message: string | null;
};

function getFinal(
  status: 'success' | 'error',
  data: any,
  errors: Errors[] | null | undefined,
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
): Promise<ImagePost> {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('audience', audience);
  formData.append('image', image);
  formData.append('type', 'image');
  const res = await fetch('/api/v1/post', {
    method: 'POST',
    body: formData,
  });
  const { status, data, errors, message }: ImagePostRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function postDefault(
  content: string,
  background: string | null,
  audience: string
): Promise<DefaultPost> {
  const res = await fetch('/api/v1/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, background, audience, type: 'default' }),
  });
  const { status, data, errors, message }: DefaultPostRes = await res.json();
  return getFinal(status, data, errors, message);
}
