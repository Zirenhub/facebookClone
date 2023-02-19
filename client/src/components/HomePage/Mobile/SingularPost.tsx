import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UseMutationResult } from '@tanstack/react-query';
import { TDBPost } from '../../../types/Post';
import Pfp from '../../../assets/pfp-two.svg';
import postBackgrounds from '../../PostBackgrounds';
import PostFooter from './Post/PostFooter';
import useAuthContext from '../../../hooks/useAuthContext';

type Props = {
  post: TDBPost;
  deletePost?: UseMutationResult<any, unknown, string, unknown>;
};

function SingularPost({ post, deletePost }: Props) {
  const [postDate, setPostDate] = useState<string | null>(null);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);

  const auth = useAuthContext();

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
    setPostDate(moment(new Date(post.createdAt)).format('MMM Do, YYYY'));
  }, [post]);

  return (
    <>
      <div className="flex justify-between relative">
        <div className="flex gap-3">
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
        {auth.user?._id === post.author._id && (
          <button
            type="button"
            onClick={() => setSettingsMenu(!settingsMenu)}
            className="text-3xl h-fit"
          >
            ...
          </button>
        )}
        {settingsMenu && (
          <div className="bg-gray-200 rounded-md px-3 py-2 absolute right-2 top-12 z-10 flex flex-col">
            <button
              type="button"
              onClick={() => {
                if (deletePost) deletePost.mutate(post._id);
              }}
              className="border-b-2"
            >
              Delete
            </button>
            <button type="button">Update</button>
          </div>
        )}
      </div>
      {getPostStyle()}
      <PostFooter postID={post._id} postReactions={post.reactions} />
    </>
  );
}

SingularPost.defaultProps = {
  deletePost: null,
};

export default SingularPost;
