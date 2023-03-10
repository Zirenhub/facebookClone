import { UseMutationResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { TComment } from '../../../../types/Post';
import Send from '../../../../assets/send.svg';

type Props = {
  sendReply: UseMutationResult<TComment, unknown, string, unknown>;
  replyingTo: TComment | null;
};

function CommentInput({ sendReply, replyingTo }: Props) {
  const [comment, setComment] = useState<string>('');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  function handleSendReply() {
    if (comment) {
      sendReply.mutate(comment);
      if (sendReply.isSuccess) {
        setComment('');
      }
    }
  }

  return (
    <div className="bg-gray-100 p-2 fixed bottom-0 left-0 w-full z-50">
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
          <div
            tabIndex={0}
            className="h-8 w-8"
            role="button"
            onMouseDown={handleSendReply}
          >
            <Send
              height="100%"
              width="100%"
              fill={comment ? 'rgb(96 165 250)' : 'rgb(209 213 219)'}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentInput;
