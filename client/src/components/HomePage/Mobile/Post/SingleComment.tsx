import { UseMutationResult } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import Pfp from '../../../../assets/pfp-two.svg';
import { NestedComment, TComment } from '../../../../types/Post';
import CommentFooter from './CommentFooter';

type Props = {
  comment: TComment;
  getReplies: UseMutationResult<NestedComment[], unknown, string, unknown>;
  replyingTo: TComment | null;
  setReplyingTo: React.Dispatch<React.SetStateAction<TComment | null>>;
  depth: number;
};

function SingleComment({
  comment,
  getReplies,
  replyingTo,
  setReplyingTo,
  depth,
}: Props) {
  const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);

  function handleOpenReplies() {
    getReplies.mutate(comment._id);
    setIsRepliesOpen(true);
  }

  const handleSetReplying = useCallback(() => {
    if (replyingTo) {
      setReplyingTo(null);
    } else {
      setReplyingTo(comment);
    }
  }, [comment, replyingTo, setReplyingTo]);

  return (
    <>
      <div
        className="flex relative"
        style={
          {
            // paddingLeft: depth >= 3 ? 30 : Number(`${depth}0`),
          }
        }
      >
        {/* {isRepliesOpen && (
          <div className="absolute -bottom-1 left-0.3 bg-gray-500 h-16 rounded-full w-2" />
        )} */}
        {depth > 0 && (
          <div style={{ width: depth >= 3 ? 30 : Number(`${depth}0`) }}>
            <div className="h-1 w-full bg-gray-500 mt-5" />
          </div>
        )}
        <div className="h-12 w-12 mr-2 z-20">
          <Pfp height="100%" width="100%" />
        </div>
        <div className="flex flex-col grow">
          <div
            className={`flex flex-col rounded-lg py-1 px-2 ${
              replyingTo?._id === comment._id ? 'bg-blue-200' : 'bg-gray-200'
            }`}
          >
            <p className="font-bold">{comment.author.fullName}</p>
            <div className="flex flex-col gap-2">
              <p>{comment.content}</p>
            </div>
          </div>
          <CommentFooter
            comment={comment}
            handleSetReplying={handleSetReplying}
          />
          {!isRepliesOpen && comment.replies > 0 && (
            <button
              type="button"
              onClick={handleOpenReplies}
              className="mr-auto text-dimGray"
            >
              Open {comment.replies} replies
            </button>
          )}
        </div>
      </div>
      {comment.children?.map((reply) => {
        return (
          <div key={reply._id}>
            <SingleComment
              comment={reply}
              getReplies={getReplies}
              setReplyingTo={setReplyingTo}
              replyingTo={replyingTo}
              depth={depth + 1}
            />
          </div>
        );
      })}
    </>
  );
}

export default SingleComment;
