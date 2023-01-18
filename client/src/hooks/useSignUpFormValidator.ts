import moment from 'moment';
import { useState } from 'react';
import { UserSignUp } from '../types/UserSignUp';

type ValidationErrorsT = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  birthday: string | null;
  gender: string | null;
};

function useSignUpFormValidator(userInfo: UserSignUp) {
  const [errors, setErrors] = useState<ValidationErrorsT>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    birthday: null,
    gender: null,
  });

  const currentYear = new Date().getFullYear();

  function validate() {
    let isValid = true;
    setErrors({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      birthday: null,
      gender: null,
    });
    if (!userInfo.firstName) {
      setErrors((current) => {
        return {
          ...current,
          firstName: 'Please provide a first name.',
        };
      });
      isValid = false;
    }
    if (!userInfo.lastName) {
      setErrors((current) => {
        return {
          ...current,
          lastName: 'Please provide a last name.',
        };
      });
      isValid = false;
    }
    if (!userInfo.email) {
      setErrors((current) => {
        return {
          ...current,
          email: 'Please provide a email.',
        };
      });
      isValid = false;
    }
    if (!userInfo.password || userInfo.password.length < 8) {
      setErrors((current) => {
        return {
          ...current,
          password: 'Password must be at least 8 characters long.',
        };
      });
      isValid = false;
    }

    const { gender, customGender } = userInfo;

    if (!gender || (gender === 'custom' && !customGender)) {
      setErrors((current) => {
        return {
          ...current,
          gender: 'Please provide a gender.',
        };
      });
      isValid = false;
    }

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
      isValid = false;
    }

    if (day < 1 || day > 31) {
      setErrors((current) => {
        return {
          ...current,
          birthday: `Day should be in range 01-31`,
        };
      });
      isValid = false;
    }
    if (month < 0 || month > 11) {
      setErrors((current) => {
        return {
          ...current,
          birthday: `Month should be in range 01-12`,
        };
      });
      isValid = false;
    }
    if (year < 1900 || year > currentYear) {
      setErrors((current) => {
        return {
          ...current,
          birthday: `Year should be in range 1900-${currentYear}`,
        };
      });
      isValid = false;
    }

    return isValid;
  }

  return { errors, validate };
}

export default useSignUpFormValidator;
