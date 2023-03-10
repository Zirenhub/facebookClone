import { useEffect, useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { UseMutationResult } from '@tanstack/react-query';
import { ModifiedPost, ReactionTypes } from '../../../../types/Post';
import LaughingReaction from '../../../../assets/laughing-reaction.gif';
import HeartReaction from '../../../../assets/heart-reaction.gif';
import LikeReaction from '../../../../assets/like-reaction.gif';
import Like from '../../../../assets/like.svg';
import Comment from '../../../../assets/comment.svg';
import Share from '../../../../assets/share.svg';
/* eslint react/jsx-props-no-spreading: 0 */

type Props = {
  post: ModifiedPost;
  reactPost: UseMutationResult<
    any,
    unknown,
    [string, ReactionTypes | null],
    unknown
  >;
  setCommentsOpen?: () => void;
};

function PostFooter({ post, reactPost, setCommentsOpen }: Props) {
  const [reactionsMenu, setReactionsMenu] = useState<boolean>(false);

  const reaction = post.reactionsDetails.myReaction;

  function handleReaction(r: ReactionTypes) {
    reactPost.mutate([post._id, r]);
  }

  const bind = useLongPress(
    () => {
      setReactionsMenu(!reactionsMenu);
    },
    {
      onCancel: () => {
        if (setReactionsMenu) setReactionsMenu(false);
        if (post.reactionsDetails.myReaction) {
          reactPost.mutate([post._id, null]);
        } else {
          reactPost.mutate([post._id, 'like']);
        }
      },
      threshold: 700,
      cancelOnMovement: false,
      detect: LongPressDetectEvents.TOUCH,
    }
  );
  // handle error
  if (reactPost.isError) {
    console.log(reactPost.error);
  }
  function getReactionButton() {
    function getReactionDisplay() {
      if (reaction === 'heart') {
        return (
          <>
            <img
              src={HeartReaction}
              alt="heart reaction"
              className="max-h-full"
            />
            <p className="text-red-500">Love</p>
          </>
        );
      }
      if (reaction === 'laugh') {
        return (
          <>
            <img
              src={LaughingReaction}
              alt="laughing reaction"
              className="max-h-full"
            />
            <p className="text-orange-500">Haha</p>
          </>
        );
      }
      return (
        <>
          <div className="w-10">
            <Like
              height="30px"
              width="30px"
              fill={`${reaction ? '#3b82f6' : 'none'}`}
            />
          </div>
          <p className={`${reaction ? 'text-blue-500' : ''}`}>Like</p>
        </>
      );
    }

    return (
      <button
        type="button"
        {...bind()}
        className="flex items-center h-full w-16"
      >
        {getReactionDisplay()}
      </button>
    );
  }

  useEffect(() => {
    function closeReactions() {
      setReactionsMenu(false);
    }

    const mainEl = document.querySelector('main');
    mainEl?.addEventListener('click', closeReactions);

    // on mobile after a long tap on reaction button, prevent context menu popup.
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };

    return () => {
      mainEl?.removeEventListener('click', closeReactions);
    };
  }, []);

  return (
    <div className="flex relative h-12 items-center justify-between text-gray-600 px-4 mt-1 py-1 border-t-2">
      {reactionsMenu && (
        <div className="bg-white rounded-md flex absolute -top-12 left-10">
          <button type="button" onTouchStart={() => handleReaction('laugh')}>
            <img
              src={LaughingReaction}
              alt="laughing reaction"
              className="bg-contain h-12 w-12 "
            />
          </button>
          <button type="button" onTouchStart={() => handleReaction('heart')}>
            <img
              src={HeartReaction}
              alt="heart reaction"
              className="h-12 w-12 bg-contain"
            />
          </button>
          <button type="button" onTouchStart={() => handleReaction('like')}>
            <img
              src={LikeReaction}
              alt="like reaction"
              className="h-12 w-12 bg-contain"
            />
          </button>
        </div>
      )}
      {getReactionButton()}
      <button
        type="button"
        onClick={setCommentsOpen}
        className="flex items-center"
      >
        <Comment height="30px" width="30px" />
        Comment
      </button>
      <button type="button" className="flex items-center">
        <Share height="30px" width="30px" />
        Share
      </button>
    </div>
  );
}

PostFooter.defaultProps = {
  setCommentsOpen: undefined,
};

export default PostFooter;
