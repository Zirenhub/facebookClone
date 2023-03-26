import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Loading from '../components/Loading';
import FacebookLogo from '../assets/facebook-logo.svg';

const SignUpModal = lazy(() => import('../components/AuthPage/SignUpPage'));

function AuthPage() {
  const [signUpIsOpen, setSignUpIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string | null>(null);

  const navigate = useNavigate();
  const auth = useAuthContext();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setErrors(null);
    if (email && password) {
      const res = await auth.logIn(email, password);
      if (res.status === 'error' && res.message) {
        setErrors(res.message);
      }
    }
  }

  useEffect(() => {
    if (auth.user) {
      navigate('/home');
    }
  }, [auth, navigate]);

  if (signUpIsOpen) {
    return (
      <Suspense fallback={<Loading />}>
        <SignUpModal close={() => setSignUpIsOpen(false)} />
      </Suspense>
    );
  }

  return (
    <div className="bg-background flex flex-col h-full sm:flex-row sm:pb-48">
      <div className="flex flex-col grow p-5 justify-center items-center sm:items-end">
        <div className="flex flex-col items-center max-w-xl">
          <div className="h-16 w-full">
            <FacebookLogo height="100%" width="100%" />
          </div>
          <p className="text-xl text-center">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
      </div>
      <div className="grow self-center">
        <div className="p-5 bg-white rounded m-10 shadow-md flex flex-col max-w-md">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e: React.SyntheticEvent) => {
                  const target = e.target as HTMLInputElement;
                  setEmail(target.value);
                }}
                placeholder="Email"
                className="border-2 rounded p-2 min-w-full"
              />
            </label>
            <label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e: React.SyntheticEvent) => {
                  const target = e.target as HTMLInputElement;
                  setPassword(target.value);
                }}
                placeholder="Password"
                className="border-2 rounded p-2 min-w-full"
              />
            </label>
            <input
              type="submit"
              value="Log In"
              className="py-3 rounded transition-all bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer"
            />
          </form>
          {errors && (
            <div>
              <p className="text-center">{errors}</p>
            </div>
          )}
          <button
            type="button"
            className="w-fit self-center mt-5 hover:underline text-blue-400"
          >
            Forgot password?
          </button>
          <div className="min-h-[1px] py-5">
            <div className="bg-gray-300 min-h-[1px]" />
          </div>
          <button
            type="button"
            className="w-fit self-center p-3 font-bold rounded-md hover:bg-green-600 transition-all bg-green-500 text-white"
            onClick={() => setSignUpIsOpen(true)}
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
