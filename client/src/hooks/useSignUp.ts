import { UserSignUp } from '../types/UserSignUp';

function useSignUp(userInfo: UserSignUp) {
  async function signup() {
    const res = await fetch('/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });
    const resData = await res.json();
    if (resData.status === 'success') {
      // successful
    } else {
      // unsuccessful
    }
  }
}

export default useSignUp;
