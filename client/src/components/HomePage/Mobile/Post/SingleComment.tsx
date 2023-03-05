import { useEffect, useState } from 'react';
import getReplies from '../../../../api/comment';
import Pfp from '../../../../assets/pfp-two.svg';
import { TComment } from '../../../../types/Post';
import CommentContent from './CommentContent';
import CommentFooter from './CommentFooter';

type Props = {
  comment: TComment;
  replyingTo: TComment | null;
  setReplyingTo: React.Dispatch<React.SetStateAction<TComment | null>>;
};

function SingleComment({ comment, replyingTo, setReplyingTo }: Props) {
  const [replies, setReplies] = useState<TComment[] | null>(null);
  const [openedReplies, setOpenedReplies] = useState<boolean>(false);

  useEffect(() => {
    if (openedReplies && comment.children) {
      setReplies(comment.children);
    }
  }, [openedReplies, comment]);

  return (
    <div className="flex">
      <div className="h-12 w-12 mr-2">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="flex flex-col grow">
        <CommentContent replyingTo={replyingTo} comment={comment} />
        <CommentFooter
          comment={comment}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
        {replies?.map((reply) => {
          return (
            <div key={reply._id}>
              <SingleComment
                comment={reply}
                setReplyingTo={setReplyingTo}
                replyingTo={replyingTo}
              />
            </div>
          );
        })}
        {!openedReplies && comment.children && comment.children.length > 0 && (
          <button
            type="button"
            onClick={() => setOpenedReplies(true)}
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
