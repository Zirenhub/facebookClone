import { useState } from 'react';
import useComments from '../../../../hooks/useComments';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';

function FullPostComments({ postID }: { postID: string }) {
  const [comment, setComment] = useState<string>('');

  const { comments, mutateSendComment, isLoading, isError, error } =
    useComments(postID);

  return (
    <div className="flex flex-col grow">
      <div className="flex grow flex-col gap-3 border-t-2 pt-2">
        {comments.length ? (
          comments.map((c) => {
            return (
              <div key={c._id} className="flex">
                <SingleComment comment={c} />
              </div>
            );
          })
        ) : (
          <p className="text-center text-dimGray">No comments here...</p>
        )}
      </div>
      <CommentInput mutateSendComment={mutateSendComment} />
    </div>
  );
}

export default FullPostComments;
