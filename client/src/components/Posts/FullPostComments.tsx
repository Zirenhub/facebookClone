import useComments from '../../hooks/useComments';
import Loading from '../Loading';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';

type Props = {
  isMobile: boolean;
  postID: string;
};

function FullPostComments({ isMobile, postID }: Props) {
  const {
    mutateGetCommentReplies,
    mutateReply,
    replyingTo,
    setReplyingTo,
    isLoading,
    isError,
    error,
    comments,
  } = useComments(postID);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-3 pt-2 mb-14">
        {comments.length ? (
          comments.map((c) => {
            return (
              <div key={c._id} className={`${c.children ? 'relative' : ''}`}>
                {c.children && (
                  <div className="left-0 top-5 bottom-14 bg-gray-500 absolute w-1" />
                )}
                <SingleComment
                  comment={c}
                  getReplies={mutateGetCommentReplies}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  depth={0}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-dimGray">No comments here...</p>
        )}
      </div>
      <CommentInput
        isMobile={isMobile}
        sendReply={mutateReply}
        replyingTo={replyingTo}
      />
    </>
  );
}

export default FullPostComments;
