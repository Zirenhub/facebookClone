import { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import { TComment, UpdatedComment } from '../../../../types/Post';

type Props = {
  mutateReply: UseMutationResult<TComment, unknown, string, unknown>;
  replyingTo: UpdatedComment | null;
};

function CommentInput({ mutateReply, replyingTo }: Props) {
  const [comment, setComment] = useState<string>('');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  return (
    <div className="border-t-2 py-1">
      {replyingTo && (
        <p className="text-dimGray">
          Replying to {replyingTo.author.fullName}...
        </p>
      )}
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        className="w-full bg-gray-200 rounded-lg p-1"
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
          <button
            type="button"
            onMouseDown={() => {
              if (comment) {
                mutateReply.mutate(comment);
              }
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentInput;
