async function checkAuth() {
  const res = await fetch('/api/v1/auth/me');
  const resData = await res.json();
  return resData;
}

export default checkAuth;
