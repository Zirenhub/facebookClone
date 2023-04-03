function stringShortener(string: string, maxLength: number) {
  if (string.length > maxLength) {
    return `${string.slice(0, maxLength)}...`;
  }
  return string;
}

export default stringShortener;
