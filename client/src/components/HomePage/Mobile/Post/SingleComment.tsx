import { useCallback, useState } from 'react';
import getReplies from '../../../../api/comment';
import Pfp from '../../../../assets/pfp-two.svg';
import { NestedComment, TComment } from '../../../../types/Post';
import CommentContent from './CommentContent';
import CommentFooter from './CommentFooter';

type Props = {
  addReplies: (c: NestedComment[]) => void;
  comment: TComment;
  replyingTo: TComment | null;
  setReplyingTo: React.Dispatch<React.SetStateAction<TComment | null>>;
};

function SingleComment({
  addReplies,
  comment,
  replyingTo,
  setReplyingTo,
}: Props) {
  const [openedReplies, setOpenedReplies] = useState<boolean>(false);

  async function commentReplies() {
    try {
      const res = await getReplies(comment._id);
      addReplies(res);
      setOpenedReplies(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleReplyingTo = useCallback(() => {
    if (replyingTo) {
      setReplyingTo(null);
    } else {
      setReplyingTo(comment);
    }
  }, [setReplyingTo, replyingTo, comment]);

  return (
    <div className="flex">
      <div className="h-12 w-12 mr-2">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="flex flex-col grow">
        <CommentContent
          replyingToMe={replyingTo?._id === comment._id}
          comment={comment}
        />
        <CommentFooter comment={comment} handleReplyingTo={handleReplyingTo} />
        {comment.children?.map((reply) => {
          return (
            <div key={reply._id}>
              <SingleComment
                addReplies={addReplies}
                comment={reply}
                setReplyingTo={setReplyingTo}
                replyingTo={replyingTo}
              />
            </div>
          );
        })}
        {!openedReplies && comment.replies > 0 && (
          <button
            type="button"
            onClick={commentReplies}
            className="mr-auto text-dimGray"
          >
            Open replies
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
