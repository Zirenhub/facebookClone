import { useEffect, useState } from 'react';
import { LongPressDetectEvents, useLongPress } from 'use-long-press';
import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import LaughingReaction from '../../../assets/laughing-reaction.gif';
import HeartReaction from '../../../assets/heart-reaction.gif';
import LikeReaction from '../../../assets/like-reaction.gif';
import Like from '../../../assets/like.svg';
import Comment from '../../../assets/comment.svg';
import Share from '../../../assets/share.svg';
/* eslint react/jsx-props-no-spreading: 0 */

type Props = {
  post: ModifiedPost;
  isMobile: boolean;
  mutationReactPost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    reactPost: (postId: string, r: ReactionTypes | null) => void;
  };
  setCommentsOpen?: () => void;
};

function PostFooter({
  post,
  isMobile,
  mutationReactPost,
  setCommentsOpen,
}: Props) {
  const [reactionsMenu, setReactionsMenu] = useState<boolean>(false);

  const reaction = post.reactionsDetails.myReaction;
  const reactions: ReactionTypes[] = ['laugh', 'heart', 'like'];
  const threshold = 700;

  function handleReaction(r: ReactionTypes | null) {
    mutationReactPost.reactPost(post._id, r);
  }

  function onClick() {
    if (post.reactionsDetails.myReaction) {
      handleReaction(null);
    } else {
      handleReaction('like');
    }
  }

  const bind = useLongPress(() => setReactionsMenu(!reactionsMenu), {
    onCancel: onClick,
    threshold,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.TOUCH,
  });

  const assignTask = () => {
    if (isMobile) {
      return bind();
    }
    let timeout: number;
    return {
      onMouseEnter: () => {
        timeout = setTimeout(() => {
          setReactionsMenu(true);
        }, threshold);
      },
      onMouseLeave: () => clearTimeout(timeout),
      onMouseDown: () => {
        clearTimeout(timeout);
        onClick();
      },
    };
  };

  // handle error
  if (mutationReactPost.isError) {
    console.log(mutationReactPost.error);
  }

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

  function getReactionSrc(r: ReactionTypes) {
    if (r === 'heart') {
      return HeartReaction;
    }
    if (r === 'laugh') {
      return LaughingReaction;
    }
    return LikeReaction;
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
    <div className="flex relative h-12 items-center justify-between text-gray-600 px-4 mt-1 py-1 border-t">
      {reactionsMenu && (
        <div className="bg-white rounded-md flex absolute -top-12 left-10">
          {reactions.map((r) => {
            return (
              <button
                type="button"
                key={r}
                onTouchStart={() => handleReaction(r)}
                onMouseDown={() => handleReaction(r)}
              >
                <img
                  src={getReactionSrc(r)}
                  alt={`${r} reaction`}
                  className="bg-contain h-12 w-12"
                />
              </button>
            );
          })}
        </div>
      )}
      <button
        type="button"
        {...assignTask()}
        className="flex items-center h-full w-16"
      >
        {getReactionDisplay()}
      </button>
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
