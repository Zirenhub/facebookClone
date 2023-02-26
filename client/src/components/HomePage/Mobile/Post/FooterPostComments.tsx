import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { getPostComments, postComment } from '../../../../api/post';
import { Comment, ModifiedPost } from '../../../../types/Post';
import PostReactions from './PostReactions';
import SingleComment from './SingleComment';

type Props = {
  post: ModifiedPost;
  close: () => void;
};

function PostComments({ post, close }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const displayHeight = window.innerHeight;
  const heightRef = useRef<HTMLDivElement>(null);

  const { isLoading, isError, error } = useQuery<Comment[], Error>({
    queryKey: ['comments', post._id],
    queryFn: () => getPostComments(post._id),
    onSuccess(successData) {
      setComments(successData);
    },
  });

  const mutateSendComment = useMutation({
    mutationFn: () => {
      return postComment(post._id, comment);
    },
    onSuccess(successData) {
      setComments([...comments, successData]);
      setComment('');
    },
  });

  function handleMove(e: React.TouchEvent) {
    if (heightRef.current) {
      const currentHeight = displayHeight - e.touches[0].clientY;
      if (currentHeight > displayHeight || currentHeight < 0) return;
      if (currentHeight <= displayHeight - displayHeight * 0.8) {
        close();
      } else {
        heightRef.current.style.height = `${currentHeight}px`;
      }
    }
  }

  return (
    <div className="absolute h-screen w-full bg-transparent/80 z-40 top-0 left-0 flex flex-col justify-end">
      <div
        ref={heightRef}
        className="bg-white h-4/5 flex flex-col rounded-md p-3"
      >
        <div
          className="flex items-center relative"
          onTouchMoveCapture={handleMove}
        >
          <PostReactions reactionsDetail={post.reactionsDetails} />
          <div className="min-h-[5px] min-w-[35px] left-2/4 -translate-x-2/4  absolute rounded-lg bg-gray-300" />
        </div>
        <div className="flex flex-col grow">
          {isLoading && <p className="text-center">Loading...</p>}
          {isError && <p>{error.message}</p>}
          {comments.length ? (
            <div className="flex flex-col gap-3">
              {comments.map((c) => {
                return (
                  <div key={c._id} className="flex">
                    <SingleComment comment={c} />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center">No comments yet.</p>
          )}
        </div>
        <div className="border-t-2 py-1">
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
                    mutateSendComment.mutate();
                  }
                }}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostComments;
