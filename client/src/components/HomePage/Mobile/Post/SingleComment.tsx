import { UseMutationResult } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Pfp from '../../../../assets/pfp-two.svg';
import { UpdatedComment } from '../../../../types/Post';
import Like from '../../../../assets/like.svg';
import useAuthContext from '../../../../hooks/useAuthContext';

type Props = {
  comment: UpdatedComment;
  mutateLikeComment: UseMutationResult<any, unknown, string, unknown>;
  mutateUnlikeComment: UseMutationResult<any, unknown, string, unknown>;
  setReplyingTo: React.Dispatch<React.SetStateAction<UpdatedComment | null>>;
  replyingTo: UpdatedComment | null;
};

function SingleComment({
  comment,
  mutateLikeComment,
  mutateUnlikeComment,
  setReplyingTo,
  replyingTo,
}: Props) {
  const [dateAgo, setDateAgo] = useState<string | null>(null);
  const [numLikes, setNumLikes] = useState<number>(0);
  const [commentIsLiked, setCommentIsLiked] = useState<boolean>(false);
  const [openedReplies, setOpenedReplies] = useState<boolean>(false);

  const auth = useAuthContext();

  useEffect(() => {
    const commentDate = new Date(comment.createdAt);
    const ago = moment(commentDate).fromNow();

    const commentLikes = comment.reactions.length;
    const likedComment = comment.reactions.find(
      (c) => c.author === auth.user?._id
    );

    setDateAgo(ago);
    setNumLikes(commentLikes);
    if (likedComment) {
      setCommentIsLiked(true);
    }
  }, [comment, auth.user]);

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

  function getReplies(specified?: number) {
    if (specified !== undefined) {
      const reply = comment.children[specified];

      return (
        <div className="text-dimGray flex gap-3">
          <p className="font-bold">{reply.author.fullName}</p>
          <p>{reply.content}</p>
        </div>
      );
    }
    return comment.children.map((c) => {
      return (
        <div key={c._id} className="text-dimGray flex gap-3">
          <p className="font-bold shrink-0">{c.author.fullName}</p>
          <p>
            {c.content.length > 28
              ? `${c.content.substring(0, 28)}...`
              : c.content}
          </p>
        </div>
      );
    });
  }

  return (
    <>
      <div className="h-12 w-12 mr-2">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="flex flex-col grow">
        <div
          className={`flex flex-col rounded-lg py-1 px-2 ${
            replyingTo?._id === comment._id ? 'bg-blue-200' : 'bg-gray-200'
          }`}
        >
          <p className="font-bold">{comment.author.fullName}</p>
          <p>{comment.content}</p>
        </div>
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
        {comment.children.length > 0 &&
          (openedReplies ? getReplies() : getReplies(0))}
        {comment.children.length > 0 && !openedReplies && (
          <button
            type="button"
            onClick={() => setOpenedReplies(true)}
            className="mr-auto text-dimGray"
          >
            Open replies
          </button>
        )}
      </div>
    </>
  );
}

export default SingleComment;
