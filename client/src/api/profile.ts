import getFullName from '../components/utils/getFullName';

function getError(data: any) {
  return data.message ? data.message : data.errors.message;
}

export async function getProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return {
      ...resData.data,
      fullName: getFullName(resData.data.firstName, resData.data.lastName),
    };
  }
  throw new Error(getError(resData));
}

export async function followProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}/follow`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData.data;
  }
  throw new Error(getError(resData));
}

export async function followersProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}/followers`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData.data;
  }
  throw new Error(getError(resData));
}
