export async function postImage(
  content: string,
  image: File,
  audience: string
) {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('audience', audience);
  formData.append('image', image);
  formData.append('type', 'image');
  const res = await fetch('/api/v1/post', {
    method: 'POST',
    body: formData,
  });
  const resData = await res.json();
  console.log(resData);
}

export const t = 0;
