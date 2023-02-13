import { useEffect, useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { TDBPost } from '../../../types/Post';
import ImagePost from './PostTypes/ImagePost';
import DefaultPost from './PostTypes/DefaultPost';
import Like from '../../../assets/like.svg';
import Comment from '../../../assets/comment.svg';
import Share from '../../../assets/share.svg';
import { likePost, unlikePost } from '../../../api/post';
import Reactions from '../../Reactions';

/* eslint react/jsx-props-no-spreading: 0 */

function SingularPost({
  post,
  userID,
}: {
  post: TDBPost;
  userID: string | undefined;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [reactionsMenu, setReactionsMenu] = useState<boolean>(false);
  const [selectedReaction, setSelectedReaction] = useState<
    'laugh' | 'heart' | 'like' | null
  >(null);

  let canLike = true;

  async function postLikeUnlike(postID: string) {
    canLike = false;
    try {
      if (!isLiked) {
        await likePost(postID);
        setIsLiked(true);
      } else {
        await unlikePost(postID);
        setIsLiked(false);
      }
      canLike = true;
    } catch (err) {
      console.log(err);
    }
  }
  function handleCommentPost() {}
  function handleSharePost() {}

  const bind = useLongPress(
    () => {
      setReactionsMenu(!reactionsMenu);
    },
    {
      onStart: () => console.log('Press started'),
      onFinish: () => console.log('Press finished'),
      onCancel: () => {
        if (setReactionsMenu) setReactionsMenu(false);
        if (canLike) {
          postLikeUnlike(post._id);
        }
      },
      // onMove: () => console.log("Detected mouse or touch movement"),
      threshold: 1000,
      captureEvent: true,
      cancelOnMovement: false,
      detect: LongPressDetectEvents.TOUCH,
    }
  );

  useEffect(() => {
    const like = post.reactions.some((reaction) => {
      return reaction.author === userID;
    });

    setIsLiked(like);
  }, [post, userID]);

  return (
    <>
      {post.image ? <ImagePost data={post} /> : <DefaultPost data={post} />}
      <div className="flex justify-between items-center text-gray-600 px-4 mt-1 py-1 border-t-2 relative">
        {reactionsMenu && (
          <Reactions
            close={() => setReactionsMenu(false)}
            setReaction={setSelectedReaction}
          />
        )}
        <button type="button" {...bind()} className="flex items-center gap-1">
          <Like
            height="20px"
            width="20px"
            fill={`${isLiked ? '#3b82f6' : 'none'}`}
          />
          Like
        </button>
        <button
          type="button"
          onClick={handleCommentPost}
          className="flex items-center gap-1"
        >
          <Comment height="25px" width="25px" />
          Comment
        </button>
        <button
          type="button"
          onClick={handleSharePost}
          className="flex items-center gap-1"
        >
          <Share height="20px" width="20px" />
          Share
        </button>
      </div>
    </>
  );
}

export default SingularPost;
