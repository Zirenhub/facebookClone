import { useRef } from 'react';
import useComments from '../../../../hooks/useComments';
import { ModifiedPost } from '../../../../types/Post';
import Loading from '../../../Loading';
import CommentInput from './CommentInput';
import PostReactions from './PostReactions';
import SingleComment from './SingleComment';

type Props = {
  post: ModifiedPost;
  close: () => void;
};

function PostComments({ post, close }: Props) {
  const displayHeight = window.innerHeight;
  const heightRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.TouchEvent) {
    if (heightRef.current) {
      const currentHeight = displayHeight - e.touches[0].clientY;
      if (currentHeight > displayHeight || currentHeight < 0) return;
      if (currentHeight <= displayHeight - displayHeight * 0.8) {
        close();
      } else {
        heightRef.current.style.height = `${currentHeight}px`;
      }
    }
  }
  const commentsHook = useComments(post._id);

  if (commentsHook.isLoading) {
    return <Loading />;
  }

  if (commentsHook.isError && commentsHook.error) {
    return <p>{commentsHook.error.message}</p>;
  }

  return (
    <div className="absolute h-screen w-full bg-transparent/80 z-40 top-0 left-0 flex flex-col justify-end">
      <div
        ref={heightRef}
        className="bg-white h-4/5 flex flex-col rounded-md p-3"
      >
        <div
          className="flex items-center relative py-2"
          onTouchMoveCapture={handleMove}
        >
          <PostReactions reactionsDetail={post.reactionsDetails} />
          <div className="min-h-[5px] min-w-[35px] left-2/4 -translate-x-2/4  absolute rounded-lg bg-gray-300" />
        </div>
        <div className="flex flex-col grow overflow-auto mb-[48px]">
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
    </div>
  );
}

export default PostComments;
