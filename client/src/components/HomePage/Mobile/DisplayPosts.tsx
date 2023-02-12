import { useEffect, useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { TDBPost } from '../../../types/Post';
import ImagePost from './PostTypes/ImagePost';
import DefaultPost from './PostTypes/DefaultPost';
import Like from '../../../assets/like.svg';
import Comment from '../../../assets/comment.svg';
import Share from '../../../assets/share.svg';
import useAuthContext from '../../../hooks/useAuthContext';
import { likePost, unlikePost } from '../../../api/post';

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
      setReactionsMenu(true);
    },
    {
      onStart: () => console.log('Press started'),
      onFinish: () => console.log('Long press finished'),
      onCancel: () => {
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
          <div className="bg-gray-100 rounded-md flex absolute p-2 -top-10 left-10">
            <p>Laugh</p>
            <p>Heart</p>
            <p>Cry</p>
          </div>
        )}
        <button type="button" {...bind()} className="flex items-center gap-1">
          <Like
            height="30px"
            width="30px"
            fill={`${isLiked ? '#2563eb' : 'none'}`}
          />
          Like
        </button>
        <button
          type="button"
          onClick={handleCommentPost}
          className="flex items-center gap-1"
        >
          <Comment />
          Comment
        </button>
        <button
          type="button"
          onClick={handleSharePost}
          className="flex items-center gap-1"
        >
          <Share />
          Share
        </button>
      </div>
    </>
  );
}

function DisplayPosts({ data }: { data: TDBPost[] }) {
  const auth = useAuthContext();

  return (
    <div>
      {data?.map((post) => {
        return (
          <div key={post._id} className="mt-2 border-b-4 border-slate-400">
            <SingularPost post={post} userID={auth.user?._id} />
          </div>
        );
      })}
    </div>
  );
}

export default DisplayPosts;
