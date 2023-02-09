function getError(data: any) {
  return data.message ? data.message : data.errors.message;
}

export default getError;
