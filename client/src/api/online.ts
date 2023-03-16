import getFinal from './getError';

export default async function getOnlineIds(): Promise<string[]> {
  const res = await fetch('/api/v1/online/');
  const { status, data, errors, message } = await res.json();
  return getFinal(status, data, errors, message);
}
