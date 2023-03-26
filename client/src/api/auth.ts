import { LogInUserRes, RegisterUserRes } from '../types/Api';
import { TProfile } from '../types/Profile';
import { UserSignUp } from '../types/UserSignUp';
import getFinal from './getError';

export async function logInUser(
  email: string,
  password: string
): Promise<TProfile> {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const { status, data, errors, message }: LogInUserRes = await res.json();
  return getFinal(status, data, errors, message);
}

export async function logOutUser() {
  const res = await fetch('/api/v1/auth/logout');
  const resData = await res.json();
  return resData;
}

export async function signUpUser(userInfo: UserSignUp): Promise<null> {
  const res = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });
  const { status, data, errors, message }: RegisterUserRes = await res.json();
  return getFinal(status, data, errors, message);
}
