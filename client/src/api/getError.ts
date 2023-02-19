type ValidationError = {
  location: string;
  msg: string;
  param: string;
  value: string;
};

function getFinal(
  status: 'success' | 'error',
  data: any,
  errors: ValidationError[] | null | undefined,
  message: string | null
) {
  if (status === 'success') {
    return data;
  }
  if (status === 'error' && message) {
    return Promise.reject(new Error(message));
  }
  if (errors) {
    const errorsString = new Error(errors.map((e) => e.msg).join('\n'));
    return Promise.reject(errorsString);
  }
  return Promise.reject(new Error('Something went wrong'));
}

export default getFinal;
