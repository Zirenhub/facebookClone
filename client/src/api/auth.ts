import { UserSignUp } from '../types/UserSignUp';

export async function checkAuth() {
  const res = await fetch('/api/v1/auth/me');
  const resData = await res.json();
  return resData;
}

export async function logInUser(email: string, password: string) {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const resData = await res.json();
  return resData;
}

export async function logOutUser() {
  const res = await fetch('/api/v1/auth/logout');
  const resData = await res.json();
  return resData;
}

export async function signUpUser(userInfo: UserSignUp) {
  const res = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });
  const resData = await res.json();
  return resData;
}
