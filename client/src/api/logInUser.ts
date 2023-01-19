async function logInUser(email: string, password: string) {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const resData = await res.json();
  return resData;
}

export default logInUser;
