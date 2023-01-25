import getFullName from '../components/utils/getFullName';

export default async function getProfile(id: string) {
  const res = await fetch(`/api/v1/profile/${id}`);
  const resData = await res.json();
  if (resData.status === 'success') {
    return {
      ...resData.data,
      fullName: getFullName(resData.data.firstName, resData.data.lastName),
    };
  }
  throw new Error('Page is not valid');
}
