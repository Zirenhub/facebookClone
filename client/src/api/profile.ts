function getError(data: any) {
  return data.message ? data.message : data.errors.message;
}

export async function getProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData.data;
  }
  throw new Error(getError(resData));
}

export async function sendRequest(id: string) {
  const res = await fetch(`/api/v1/profile/${id}/sendRequest`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData.data;
  }
  throw new Error(getError(resData));
}

export async function getRequests() {
  const res = await fetch(`/api/v1/profile/requests`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return resData.data;
  }

  throw new Error(getError(resData));
}
