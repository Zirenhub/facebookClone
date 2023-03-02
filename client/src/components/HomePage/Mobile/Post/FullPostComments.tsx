import useComments from '../../../../hooks/useComments';
import Loading from '../../../Loading';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';

function FullPostComments({ postID }: { postID: string }) {
  const {
    comments,
    mutateReply,
    mutateLikeComment,
    mutateUnlikeComment,
    replyingTo,
    setReplyingTo,
    isLoading,
    isError,
    error,
  } = useComments(postID);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex grow flex-col gap-3 border-t-2 pt-2">
        {comments.length ? (
          comments.map((c) => {
            return (
              <div key={c._id} className="flex">
                <SingleComment
                  comment={c}
                  mutateLikeComment={mutateLikeComment}
                  mutateUnlikeComment={mutateUnlikeComment}
                  setReplyingTo={setReplyingTo}
                  replyingTo={replyingTo}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-dimGray">No comments here...</p>
        )}
      </div>
      <CommentInput mutateReply={mutateReply} replyingTo={replyingTo} />
    </div>
  );
}

export default FullPostComments;
