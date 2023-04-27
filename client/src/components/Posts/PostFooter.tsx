import { useEffect, useState } from 'react';
import { LongPressDetectEvents, useLongPress } from 'use-long-press';
import { ModifiedPost, ReactionTypes } from '../../types/Post';
import LaughingReaction from '../../assets/laughing-reaction.gif';
import HeartReaction from '../../assets/heart-reaction.gif';
import LikeReaction from '../../assets/like-reaction.gif';
import Like from '../../assets/like.svg';
import Comment from '../../assets/comment.svg';
import Share from '../../assets/share.svg';
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
  const reactions: { type: ReactionTypes; src: string }[] = [
    { type: 'laugh', src: LaughingReaction },
    { type: 'heart', src: HeartReaction },
    { type: 'like', src: LikeReaction },
  ];
  const threshold = 700;
  let timeout: number;

  function handleReaction(r: ReactionTypes | null) {
    mutationReactPost.reactPost(post._id, r);
  }

  function onClick() {
    if (reaction) {
      handleReaction(null);
    } else {
      handleReaction('like');
    }
  }

  const bindMobile = useLongPress(() => setReactionsMenu(!reactionsMenu), {
    onCancel: onClick,
    threshold,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.TOUCH,
  });

  const bindDesktop = () => {
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

  // // handle error
  // if (mutationReactPost.isError) {
  //   console.log(mutationReactPost.error);
  // }

  function getReactionDisplay() {
    const matchingReaction = reactions.find((r) => r.type === reaction);
    const { type, src } = matchingReaction || reactions[2];

    if (matchingReaction && type !== 'like') {
      return (
        <>
          <img src={src} alt={`${type} reaction`} />
          <p className={type === 'heart' ? 'text-red-500' : 'text-orange-500'}>
            {type === 'heart' ? 'Love' : 'Haha'}
          </p>
        </>
      );
    }
    return (
      <>
        <div className="w-10">
          <Like
            height="30px"
            width="30px"
            fill={`${matchingReaction ? '#3b82f6' : 'none'}`}
          />
        </div>
        <p className={`${matchingReaction ? 'text-blue-500' : ''}`}>Like</p>
      </>
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
    <div className="flex items-center relative justify-between text-gray-600 px-4 mt-1 py-1 border-t">
      {reactionsMenu && (
        <div className="bg-white rounded-md flex absolute -top-12 left-10">
          {reactions.map((r) => {
            return (
              <button
                type="button"
                key={r.type}
                onTouchStart={() => handleReaction(r.type)}
                onMouseDown={() => handleReaction(r.type)}
              >
                <img
                  src={r.src}
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
        {...(isMobile ? { ...bindMobile() } : { ...bindDesktop() })}
        className="flex items-center h-full w-9"
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
