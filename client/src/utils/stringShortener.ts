function stringShortener(string: string, maxLength: number, length: number) {
  if (string.length > maxLength) {
    return `${string.slice(0, length)}...`;
  }
  return string;
}

export default stringShortener;
