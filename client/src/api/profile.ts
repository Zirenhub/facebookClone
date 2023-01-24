export default async function getProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData;
  }
  throw new Error('Something went wrong getting profile');
}
