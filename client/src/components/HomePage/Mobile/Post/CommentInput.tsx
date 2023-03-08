import { UseMutationResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { TComment } from '../../../../types/Post';

type Props = {
  sendReply: UseMutationResult<TComment, unknown, string, unknown>;
  replyingTo: TComment | null;
};

function CommentInput({ sendReply, replyingTo }: Props) {
  const [comment, setComment] = useState<string>('');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  function handleSendReply() {
    sendReply.mutate(comment);
    if (sendReply.isSuccess) {
      setComment('');
    }
  }

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
          <button type="button" onMouseDown={handleSendReply}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentInput;
