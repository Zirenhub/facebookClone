import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { TDBPost } from '../../../types/Post';
import Like from '../../../assets/like.svg';
import Pfp from '../../../assets/pfp-two.svg';
import postBackgrounds from '../../PostBackgrounds';
import PostFooter from './Post/PostFooter';

type PostReactions = {
  reactionsAmount: {
    like: number;
    laugh: number;
    heart: number;
  };
  commentsAmount: number;
};

function SingularPost({ post }: { post: TDBPost }) {
  const [postReactions, setPostReactions] = useState<PostReactions>({
    reactionsAmount: { like: 0, laugh: 0, heart: 0 },
    commentsAmount: 0,
  });
  const [postDate, setPostDate] = useState<string | null>(null);

  const navigate = useNavigate();

  function getPostStyle() {
    if (post.image) {
      return (
        <div>
          <p>{post.content}</p>
          <img alt="post" src={post.image} />
        </div>
      );
    }
    if (post.background) {
      const background = postBackgrounds.find(
        (b) => b.name === post.background
      );
      return (
        <div className="relative mt-3">
          <img alt={background?.desc} src={background?.src} />
          <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full text-center">
            <p className="text-white">{post.content}</p>
          </div>
        </div>
      );
    }
    return <p className="text-xl">{post.content}</p>;
  }

  function navigateProfile() {
    navigate(`/${post.author._id}`);
  }

  useEffect(() => {
    const reactions = {
      laugh: 0,
      heart: 0,
      like: 0,
    };

    post.reactions.forEach((r) => {
      if (r.type === 'laugh') {
        reactions.laugh += 1;
      } else if (r.type === 'heart') {
        reactions.heart += 1;
      } else {
        reactions.like += 1;
      }
    });

    const { laugh, heart, like } = reactions;

    setPostReactions({
      reactionsAmount: { laugh, heart, like },
      commentsAmount: 0,
    });

    setPostDate(moment(new Date(post.createdAt)).format('MMM Do, YYYY'));
  }, [post]);

  return (
    <>
      <div className="flex gap-2">
        <button type="button" onClick={navigateProfile} className="w-12 h-12">
          <Pfp height="100%" width="100%" />
        </button>
        <div
          className="flex flex-col"
          onClick={navigateProfile}
          onKeyDown={navigateProfile}
          role="button"
          tabIndex={0}
        >
          <p className="font-bold">{post.author.fullName}</p>
          <p>{postDate}</p>
        </div>
      </div>
      {getPostStyle()}
      <div className="flex items-center">
        <Like fill="rgb(6 165 250)" />
        <p>
          {postReactions.reactionsAmount.like +
            postReactions.reactionsAmount.heart +
            postReactions.reactionsAmount.laugh}
        </p>
      </div>
      <PostFooter postID={post._id} postReactions={post.reactions} />
    </>
  );
}

export default SingularPost;
