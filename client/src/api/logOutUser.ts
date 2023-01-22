async function logOutUser() {
  const res = await fetch('/api/v1/auth/logout');
  const resData = await res.json();
  return resData;
}

export default logOutUser;
