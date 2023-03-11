import { GetPostCommentsRes } from '../types/Api';
import { NestedComment } from '../types/Post';
import getFinal from './getError';

export default async function getReplies(
  commentID: string
): Promise<NestedComment[]> {
  const res = await fetch(`/api/v1/comment/${commentID}/replies`);
  const { status, data, errors, message }: GetPostCommentsRes =
    await res.json();
  return getFinal(status, data, errors, message);
}
