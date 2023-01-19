import { UserSignUp } from '../types/UserSignUp';

async function signUpUser(userInfo: UserSignUp) {
  const res = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });
  const resData = await res.json();
  return resData;
}

export default signUpUser;
