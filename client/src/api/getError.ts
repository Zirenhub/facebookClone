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
    throw new Error(message);
  }
  if (errors) {
    const errorsString = errors.map((e) => e.msg).join('\n');
    throw new Error(errorsString);
  }
  throw new Error('Something went wrong');
}

export default getFinal;
