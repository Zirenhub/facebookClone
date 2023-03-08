import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { postComment, replyToComment } from '../../../../api/post';
import { TComment } from '../../../../types/Post';

type Props = {
  onAddComment: (comment: TComment) => void;
  replyingTo: TComment | null;
  postID: string;
};

function CommentInput({ onAddComment, replyingTo, postID }: Props) {
  const [comment, setComment] = useState<string>('');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const mutateReply = useMutation({
    mutationFn: () => {
      if (replyingTo) {
        return replyToComment(postID, replyingTo._id, comment);
      }
      return postComment(postID, comment);
    },
    onSuccess(data) {
      setComment('');
      onAddComment(data);
    },
  });

  return (
    <div className="bg-gray-100 p-2 fixed bottom-0 left-0 w-full">
      {replyingTo && (
        <p className="text-dimGray">
          Replying to {replyingTo.author.fullName}...
        </p>
      )}
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        className="w-full bg-gray-300 rounded-lg p-1"
        onFocus={() => setIsWriting(true)}
        onBlur={() => setIsWriting(false)}
        onChange={(e: React.SyntheticEvent) => {
          const target = e.target as HTMLInputElement;
          setComment(target.value);
        }}
      />
      {isWriting && (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <button type="button">Photo</button>
            <button type="button">Gif</button>
            <button type="button">Emoji</button>
          </div>
          <button type="button" onMouseDown={() => mutateReply.mutate()}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentInput;
