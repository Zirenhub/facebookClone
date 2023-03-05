import moment from 'moment';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuthContext from '../../../../hooks/useAuthContext';
import Like from '../../../../assets/like.svg';
import { TComment } from '../../../../types/Post';
import { likeComment, unlikeComment } from '../../../../api/post';

type Props = {
  comment: TComment;
  setReplyingTo: React.Dispatch<React.SetStateAction<TComment | null>>;
  replyingTo: TComment | null;
};

function CommentFooter({ comment, setReplyingTo, replyingTo }: Props) {
  const [commentIsLiked, setCommentIsLiked] = useState<boolean>(false);
  const [dateAgo, setDateAgo] = useState<string | null>(null);
  const [numLikes, setNumLikes] = useState<number>(0);

  const auth = useAuthContext();

  const mutateLikeComment = useMutation({
    mutationFn: (commentID: string) => {
      return likeComment(commentID);
    },
    onSuccess() {
      setCommentIsLiked(true);
      setNumLikes(numLikes + 1);
    },
  });

  const mutateUnlikeComment = useMutation({
    mutationFn: (commentID: string) => {
      return unlikeComment(commentID);
    },
    onSuccess() {
      setCommentIsLiked(false);
      setNumLikes(numLikes - 1);
    },
  });

  function getLikedButton() {
    if (commentIsLiked) {
      return (
        <button
          type="button"
          className="text-blue-500"
          onClick={() => {
            mutateUnlikeComment.mutate(comment._id);
            setCommentIsLiked(false);
          }}
        >
          Unlike
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => mutateLikeComment.mutate(comment._id)}
      >
        Like
      </button>
    );
  }

  function handleReplyingTo() {
    if (replyingTo) {
      setReplyingTo(null);
    } else {
      setReplyingTo(comment);
    }
  }

  useEffect(() => {
    const commentDate = new Date(comment.createdAt);
    const ago = moment(commentDate).fromNow();

    const commentLikes = comment.reactions.length;
    const myLike = comment.reactions.find((r) => r.author === auth.user?._id);

    setDateAgo(ago);
    setNumLikes(commentLikes);
    if (myLike) {
      setCommentIsLiked(true);
    }
  }, [comment, auth.user]);

  return (
    <div className="flex text-dimGray gap-3">
      <p>{dateAgo}</p>
      {getLikedButton()}
      <button type="button" onClick={handleReplyingTo}>
        Reply
      </button>
      <div className="ml-auto mr-2 flex items-center">
        <p>{numLikes}</p>
        <Like fill="white" />
      </div>
    </div>
  );
}

export default CommentFooter;
