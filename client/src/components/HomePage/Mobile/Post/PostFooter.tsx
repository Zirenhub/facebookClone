import { useEffect, useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { postReact, removePostReact } from '../../../../api/post';
import { Reactions, ReactionTypes } from '../../../../types/Post';
import LaughingReaction from '../../../../assets/laughing-reaction.gif';
import HeartReaction from '../../../../assets/heart-reaction.gif';
import LikeReaction from '../../../../assets/like-reaction.gif';
import Like from '../../../../assets/like.svg';
import Comment from '../../../../assets/comment.svg';
import Share from '../../../../assets/share.svg';
import useAuthContext from '../../../../hooks/useAuthContext';
/* eslint react/jsx-props-no-spreading: 0 */

type Props = {
  postID: string;
  postReactions: Reactions;
};

function PostFooter({ postID, postReactions }: Props) {
  const [reactionsMenu, setReactionsMenu] = useState<boolean>(false);
  const [reaction, setReaction] = useState<ReactionTypes | null>(null);
  const [reactionsDetail, setReactionsDetail] = useState({
    reactionsInfo: { like: 0, heart: 0, laugh: 0 },
    commentsNum: 0,
  });

  const auth = useAuthContext();

  function increaseDecreaseReactions(r: ReactionTypes, operation: '+' | '-') {
    setReactionsDetail({
      ...reactionsDetail,
      reactionsInfo: {
        ...reactionsDetail.reactionsInfo,
        [r]:
          operation === '+'
            ? (reactionsDetail.reactionsInfo[r] += 1)
            : (reactionsDetail.reactionsInfo[r] -= 1),
      },
    });
  }

  async function handleReaction(r: ReactionTypes) {
    try {
      await postReact(postID, r);
      setReaction(r);
      if (!reaction) {
        increaseDecreaseReactions(r, '+');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const bind = useLongPress(
    () => {
      setReactionsMenu(!reactionsMenu);
    },
    {
      onCancel: async () => {
        if (setReactionsMenu) setReactionsMenu(false);
        try {
          if (reaction) {
            await removePostReact(postID);
            setReaction(null);
            increaseDecreaseReactions(reaction, '-');
          } else {
            await postReact(postID, 'like');
            setReaction('like');
            increaseDecreaseReactions('like', '+');
          }
        } catch (err) {
          console.log(err);
        }
      },
      threshold: 700,
      cancelOnMovement: false,
      detect: LongPressDetectEvents.TOUCH,
    }
  );

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
    const mainEl = document.querySelector('main');
    mainEl?.addEventListener('click', () => setReactionsMenu(false));
  }, []);

  useEffect(() => {
    const myReaction = postReactions.find((r) => r.author === auth.user?._id);
    if (myReaction) {
      setReaction(myReaction.type);
    }

    const laughs = postReactions.filter((r) => r.type === 'laugh');
    const likes = postReactions.filter((r) => r.type === 'like');
    const hearts = postReactions.filter((r) => r.type === 'heart');

    setReactionsDetail({
      reactionsInfo: {
        laugh: laughs.length,
        heart: hearts.length,
        like: likes.length,
      },
      commentsNum: 0,
    });
  }, [postReactions, auth]);

  return (
    <>
      <div className="flex items-center">
        <Like fill="rgb(6 165 250)" />
        <p>
          {reactionsDetail.reactionsInfo.like +
            reactionsDetail.reactionsInfo.heart +
            reactionsDetail.reactionsInfo.laugh}
        </p>
      </div>
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
        <button type="button" className="flex items-center">
          <Comment height="30px" width="30px" />
          Comment
        </button>
        <button type="button" className="flex items-center">
          <Share height="30px" width="30px" />
          Share
        </button>
      </div>
    </>
  );
}

export default PostFooter;
