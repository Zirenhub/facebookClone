import { useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { TDBPost } from '../../../types/Post';
import ImagePost from './PostTypes/ImagePost';
import DefaultPost from './PostTypes/DefaultPost';
import Like from '../../../assets/like.svg';
import Comment from '../../../assets/comment.svg';
import Share from '../../../assets/share.svg';
import { postReact, removePostReact } from '../../../api/post';
import Reactions from '../../Reactions';

/* eslint react/jsx-props-no-spreading: 0 */

function SingularPost({
  post,
  userID,
}: {
  post: TDBPost;
  userID: string | undefined;
}) {
  const [reactionsMenu, setReactionsMenu] = useState<boolean>(false);
  const [reaction, setReaction] = useState<'laugh' | 'heart' | 'like' | null>(
    null
  );

  function handleCommentPost() {}
  function handleSharePost() {}

  const bind = useLongPress(
    () => {
      setReactionsMenu(!reactionsMenu);
    },
    {
      onStart: () => console.log('Press started'),
      onFinish: () => console.log('Press finished'),
      onCancel: async () => {
        if (setReactionsMenu) setReactionsMenu(false);
        try {
          if (reaction) {
            await removePostReact(post._id);
            setReaction(null);
          } else {
            await postReact(post._id, 'like');
            setReaction('like');
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

  // useEffect(() => {
  //   const like = post.reactions.some((reaction) => {
  //     return reaction.author === userID;
  //   });

  //   setHasReacted(like);
  // }, [post, userID]);

  return (
    <>
      {post.image ? <ImagePost data={post} /> : <DefaultPost data={post} />}
      <div className="flex justify-between items-center text-gray-600 px-4 mt-1 py-1 border-t-2 relative">
        {reactionsMenu && (
          <Reactions
            close={() => setReactionsMenu(false)}
            setReaction={setReaction}
          />
        )}
        <button type="button" {...bind()} className="flex items-center gap-1">
          <Like
            height="20px"
            width="20px"
            fill={`${reaction ? '#3b82f6' : 'none'}`}
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
