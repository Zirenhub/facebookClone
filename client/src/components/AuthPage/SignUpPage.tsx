import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface Props {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

type BirthdayT = {
  day: number;
  month: number;
  year: number;
};

type UserInfoT = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  gender: string;
  customGender?: string;
};

type ValidationErrorsT = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  birthday?: string | null;
  gender?: string | null;
};

function SignUpPage({ setSignUp }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfoT>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    birthday: moment().toDate(),
  });
  const [errors, setErrors] = useState<ValidationErrorsT | null>(null);
  const [birthdayRaw, setBirthdayRaw] = useState<BirthdayT>({
    day: 1,
    month: 0,
    year: 2023,
  });
  const currentYear = new Date().getFullYear();

  function handleBirthday(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    let targetVal = Number(target.value);
    if (Number.isNaN(targetVal)) {
      return;
    }
    const max = Number(target.max);
    if (targetVal <= max) {
      if (target.id === 'month') {
        targetVal -= 1; // date starts couting months from 0
      }
      setBirthdayRaw((current) => {
        return {
          ...current,
          [`${target.id}`]: targetVal,
        };
      });
    }
  }

  useEffect(() => {
    const years = birthdayRaw.year;
    const months = birthdayRaw.month;
    const date = birthdayRaw.day;

    setUserInfo((current) => {
      return {
        ...current,
        birthday: moment({ years, months, date }).toDate(),
      };
    });
  }, [birthdayRaw]);

  function handleGender(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setUserInfo((current) => {
      return {
        ...current,
        gender: target.value,
      };
    });
  }

  function handleInfo(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setUserInfo((current) => {
      return {
        ...current,
        [`${target.id}`]: target.value,
      };
    });
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setErrors(null);
    function validateInfo() {
      let valid = true;
      if (!userInfo.firstName) {
        setErrors((current) => {
          return {
            ...current,
            firstName: 'Please provide a first name.',
          };
        });
        valid = false;
      }
      if (!userInfo.lastName) {
        setErrors((current) => {
          return {
            ...current,
            lastName: 'Please provide a last name.',
          };
        });
        valid = false;
      }
      if (!userInfo.email) {
        setErrors((current) => {
          return {
            ...current,
            email: 'Please provide a email.',
          };
        });
        valid = false;
      }
      if (!userInfo.password || userInfo.password.length < 8) {
        setErrors((current) => {
          return {
            ...current,
            password: 'Password must be at least 8 characters long.',
          };
        });
        valid = false;
      }
      return valid;
    }
    function validateGender() {
      let valid = true;
      const { gender, customGender } = userInfo;
      if (!gender || (gender === 'custom' && !customGender)) {
        setErrors((current) => {
          return {
            ...current,
            gender: 'Please provide a gender.',
          };
        });
        valid = false;
      }
      return valid;
    }
    function validateBirthday() {
      let valid = true;
      const day = userInfo.birthday.getDate();
      const month = userInfo.birthday.getMonth();
      const year = userInfo.birthday.getFullYear();

      if (!moment(userInfo.birthday).isValid()) {
        setErrors((current) => {
          return {
            ...current,
            birthday: `Invalid date`,
          };
        });
        valid = false;
      }

      if (day < 1 || day > 31) {
        setErrors((current) => {
          return {
            ...current,
            birthday: `Day should be in range 01-31`,
          };
        });
        valid = false;
      }
      if (month < 0 || month > 11) {
        setErrors((current) => {
          return {
            ...current,
            birthday: `Month should be in range 01-12`,
          };
        });
        valid = false;
      }
      if (year < 1900 || year > currentYear) {
        setErrors((current) => {
          return {
            ...current,
            birthday: `Year should be in range 1900-${currentYear}`,
          };
        });
        valid = false;
      }
      return valid;
    }

    const infoValidation = validateInfo();
    const genderValidation = validateGender();
    const birthdayValidation = validateBirthday();

    if (infoValidation && genderValidation && birthdayValidation) {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      const resData = await res.json();
      console.log(resData);
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
          <form
            className="gap-2 w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={userInfo.firstName}
                  onChange={handleInfo}
                  placeholder="First Name"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
                {errors?.firstName && <p>{errors.firstName}</p>}
              </label>
              <label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={userInfo.lastName}
                  onChange={handleInfo}
                  placeholder="Last Name"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
                {errors?.lastName && <p>{errors.lastName}</p>}
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userInfo.email}
                  onChange={handleInfo}
                  placeholder="Email"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
              </label>
              {errors?.email && <p>{errors.email}</p>}
            </div>
            <div className="flex flex-col w-full">
              <label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={userInfo.password}
                  onChange={handleInfo}
                  placeholder="Password"
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
              </label>
              {errors?.password && <p>{errors.password}</p>}
            </div>
            <p className="text-gray-500 text-sm self-start">
              Birthday DD/MM/YYYY
            </p>
            <div className="flex justify-between w-full gap-5">
              <label>
                <input
                  type="text"
                  value={
                    birthdayRaw.day < 10
                      ? `0${birthdayRaw.day}`
                      : birthdayRaw.day
                  }
                  id="day"
                  min="1"
                  max="31"
                  name="birthdayDay"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={
                    birthdayRaw.month < 10
                      ? `0${birthdayRaw.month + 1}`
                      : birthdayRaw.month + 1
                  }
                  id="month"
                  min="1"
                  max="12"
                  name="birthdayMonth"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={birthdayRaw.year}
                  id="year"
                  min="1900"
                  max={currentYear}
                  name="birthdayYear"
                  onChange={handleBirthday}
                  className="border-2 rounded p-2 w-full"
                />
              </label>
            </div>
            {errors?.birthday && <p>{errors.birthday}</p>}
            <div className="w-full">
              <fieldset
                className="flex gap-5 justify-between"
                onChange={handleGender}
              >
                <legend className="text-gray-500 text-sm self-start">
                  Gender
                </legend>
                <label className="p-2 rounded border-2 flex justify-between w-full">
                  Male
                  <input type="radio" name="gender" value="male" />
                </label>
                <label className="p-2 rounded border-2 flex justify-between w-full">
                  Female
                  <input type="radio" name="gender" value="female" />
                </label>
                <label className="p-2 rounded border-2 flex justify-between w-full">
                  Custom
                  <input type="radio" name="gender" value="custom" />
                </label>
              </fieldset>
            </div>
            {userInfo.gender === 'custom' && (
              <label className="w-full">
                <input
                  type="text"
                  name="gender"
                  value={userInfo.customGender || ''}
                  placeholder="Gender*"
                  onChange={(e: React.SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setUserInfo((current) => {
                      return {
                        ...current,
                        customGender: target.value,
                      };
                    });
                  }}
                  className="border-2 rounded p-2 w-full bg-gray-100"
                />
              </label>
            )}
            {errors?.gender && <p>{errors.gender}</p>}

            <input
              type="submit"
              value="Sign Up"
              className="py-1 rounded transition-all bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer px-10 m-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
