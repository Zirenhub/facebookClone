import useComments from '../../../hooks/useComments';
import Loading from '../../Loading';
import CommentInput from './CommentInput';

import SingleComment from './SingleComment';

function FullPostComments({ postID }: { postID: string }) {
  const commentsHook = useComments(postID);

  if (commentsHook.isLoading) {
    return <Loading />;
  }

  if (commentsHook.isError && commentsHook.error) {
    return <p>{commentsHook.error.message}</p>;
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex grow flex-col gap-3 border-t-2 pt-2 mb-[48px]">
        {commentsHook.comments.length ? (
          commentsHook.comments.map((c) => {
            return (
              <div key={c._id} className="relative">
                {c.children && (
                  <div className="left-0 top-5 bottom-14 bg-gray-500 absolute w-1" />
                )}
                <SingleComment
                  comment={c}
                  getReplies={commentsHook.mutateGetCommentReplies}
                  replyingTo={commentsHook.replyingTo}
                  setReplyingTo={commentsHook.setReplyingTo}
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
        sendReply={commentsHook.mutateReply}
        replyingTo={commentsHook.replyingTo}
      />
    </div>
  );
}

export default FullPostComments;
