import { UseMutationResult } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Pfp from '../../../../assets/pfp-two.svg';
import { TComment } from '../../../../types/Post';
import Like from '../../../../assets/like.svg';
import useAuthContext from '../../../../hooks/useAuthContext';

type Props = {
  comment: TComment;
  mutateLikeComment: UseMutationResult<any, unknown, string, unknown>;
};

function SingleComment({ comment, mutateLikeComment }: Props) {
  const [dateAgo, setDateAgo] = useState<string | null>(null);
  const [numLikes, setNumLikes] = useState<number>(0);
  const [commentIsLiked, setCommentIsLiked] = useState<boolean>(false);

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
        <button type="button" className="text-blue-500">
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

  return (
    <>
      <div className="h-12 w-12 mr-2">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="flex flex-col grow">
        <div className="flex flex-col bg-gray-200 rounded-lg py-1 px-2">
          <p className="font-bold">{comment.author.fullName}</p>
          <p>{comment.content}</p>
        </div>
        <div className="flex text-dimGray gap-3">
          <p>{dateAgo}</p>
          {getLikedButton()}
          <button type="button">Reply</button>
          <div className="ml-auto mr-2 flex items-center">
            <p>{numLikes}</p>
            <Like fill="white" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleComment;
