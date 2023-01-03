import { useState } from 'react';
import SignUpPage from './SignUpPage';

function AuthPage() {
  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <>
      {signUp && <SignUpPage setSignUp={setSignUp} />}
      <div className="bg-background flex flex-col h-full sm:flex-row sm:pb-48">
        <div className="flex flex-col grow p-5 justify-center items-center sm:items-end">
          <div className="flex flex-col items-center max-w-xl">
            <div className="bg-facebook-logo min-h-[8rem] min-w-full bg-cover bg-center bg-no-repeat" />
            <p className="text-xl text-center">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>
        </div>
        <div className="grow self-center">
          <div className="p-5 bg-white rounded m-10 shadow-md flex flex-col max-w-md">
            <form className="flex flex-col gap-5">
              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border-2 rounded p-2 min-w-full"
                />
              </label>
              <label>
                <input
                  type="password"
                  name="password"
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
              onClick={() => setSignUp(true)}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
