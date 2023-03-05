import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { getPostComments } from '../../../../api/post';
import { TComment } from '../../../../types/Post';
import Loading from '../../../Loading';
import CommentInput from './CommentInput';

import SingleComment from './SingleComment';

function FullPostComments({ postID }: { postID: string }) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [replyingTo, setReplyingTo] = useState<TComment | null>(null);

  const { isLoading, isError, error } = useQuery<TComment[], Error>({
    queryKey: ['comments', postID],
    queryFn: () => getPostComments(postID),
    onSuccess(successData) {
      console.log(successData);
      setComments(successData);
    },
  });

  const handleAddComment = useCallback(
    (c: TComment) => {
      setComments([...comments, c]);
    },
    [comments]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex grow flex-col gap-3 border-t-2 pt-2">
        {comments.length ? (
          comments.map((c) => {
            return (
              <div key={c._id} className="flex flex-col">
                <SingleComment
                  comment={c}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-dimGray">No comments here...</p>
        )}
      </div>
      <CommentInput
        onAddComment={handleAddComment}
        replyingTo={replyingTo}
        postID={postID}
      />
    </div>
  );
}

export default FullPostComments;
