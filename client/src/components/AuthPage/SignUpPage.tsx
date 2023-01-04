import { useState } from 'react';

interface Props {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

type BirthdayType = {
  day: number;
  month: number;
  year: number;
};

function SignUpPage({ setSignUp }: Props) {
  const [birthday, setBirthday] = useState<BirthdayType>({
    day: 12,
    month: 4,
    year: 2002,
  });

  function handleBirthday(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const targetVal = Number(target.value);
    const max = Number(target.max);
    const min = Number(target.min);
    if (target.id === 'birthdayMonth') {
      if (targetVal <= max && targetVal >= min) {
        setBirthday({
          ...birthday,
          month: targetVal,
        });
      }
    } else if (target.id === 'birthdayDay') {
      if (targetVal <= max && targetVal >= min) {
        setBirthday({
          ...birthday,
          day: targetVal,
        });
      }
    } else if (target.id === 'birthdayYear') {
      if (targetVal <= max && targetVal >= min) {
        setBirthday({
          ...birthday,
          year: targetVal,
        });
      }
    }
  }

  return (
    <div className="z-10 bg-gray-200/40 absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded shadow-md max-w-lg">
        <div className="px-3 py-1">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Sign Up</p>
            <button
              type="button"
              aria-label="Close"
              className="bg-close bg-contain bg-center bg-no-repeat min-h-[16px] min-w-[16px]"
              onClick={() => setSignUp(false)}
            />
          </div>
          <p className="text-gray-500">It&apos;s quick and easy.</p>
        </div>
        <div className="py-3">
          <div className="bg-gray-300 min-h-[1px]" />
        </div>
        <div className="flex px-3">
          <form className="gap-2 w-full flex flex-col items-center">
            <div className="flex sm:flex-row flex-col gap-2">
              <label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
              </label>
            </div>
            <label className="sm:w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border-2 rounded p-2 w-full bg-gray-100"
              />
            </label>
            <label className="sm:w-full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-2 rounded p-2 w-full bg-gray-100"
              />
            </label>
            <p className="text-gray-500 text-sm self-start">Birthday</p>
            <div className="flex sm:flex-row flex-col justify-between w-full pb-5 gap-5">
              <label>
                <input
                  type="number"
                  value={birthday.day}
                  id="birthdayDay"
                  min="1"
                  max="31"
                  name="birthdayDay"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
              <label>
                <input
                  type="number"
                  // value={
                  //   birthday.month < 10 ? `0${birthday.month}` : birthday.month
                  // }
                  value={birthday.month}
                  id="birthdayMonth"
                  min="1"
                  max="12"
                  name="birthdayMonth"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
              <label>
                <input
                  type="number"
                  value={birthday.year}
                  id="birthdayYear"
                  min="1900"
                  max={new Date().getFullYear()}
                  name="birthdayYear"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
