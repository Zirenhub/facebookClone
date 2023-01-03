function AuthPage() {
  return (
    <div className="bg-[#f0f2f5] flex flex-col h-full">
      <div className="flex flex-col p-5">
        <div className="flex justify-center">
          <div className="bg-facebook-logo min-h-[8rem] max-w-xs bg-cover bg-center bg-no-repeat grow" />
        </div>
        <div className="flex justify-center px-10">
          <p className="text-xl text-center">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
      </div>
      <div className="p-5 bg-white rounded m-10 shadow-md flex flex-col">
        <form className="flex flex-col gap-5">
          <label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="border-2 rounded p-2 min-w-full"
            />
          </label>
          <label>
            <input
              type="text"
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
          className="w-fit self-center p-3 font-bold rounded-md bg-green-500 text-white"
        >
          Create new account
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
