import { UseMutationResult } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TDBPost } from '../../../../types/Post';
import postBackgrounds from '../../../PostBackgrounds';
import Pfp from '../../../../assets/pfp-two.svg';

type Props = {
  post: TDBPost;
  openPost: () => void;
  deletePost?: UseMutationResult<any, unknown, string, unknown>;
};

function PostContent({ post, openPost, deletePost }: Props) {
  const [postDate, setPostDate] = useState<string | null>(null);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);

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

  const navigate = useNavigate();

  function navigateProfile(e: React.SyntheticEvent) {
    e.stopPropagation();
    navigate(`/${post.author._id}`);
  }

  useEffect(() => {
    setPostDate(moment(new Date(post.createdAt)).format('MMM Do, YYYY'));
  }, [post]);

  return (
    <>
      <div
        onClick={openPost}
        onKeyDown={openPost}
        role="button"
        tabIndex={0}
        className="flex justify-between relative"
      >
        <div
          onClick={navigateProfile}
          onKeyDown={navigateProfile}
          role="button"
          tabIndex={0}
          className="flex gap-3"
        >
          <div className="w-12 h-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{post.author.fullName}</p>
            <p>{postDate}</p>
          </div>
        </div>
        {deletePost && (
          <button
            type="button"
            onClick={(e: React.SyntheticEvent) => {
              e.stopPropagation();
              setSettingsMenu(!settingsMenu);
            }}
            className="text-3xl h-fit"
          >
            ...
          </button>
        )}
        {settingsMenu && (
          <div className="bg-gray-200 font-bold rounded-md px-3 py-2 absolute right-2 top-12 z-10 flex flex-col">
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
    </>
  );
}

PostContent.defaultProps = {
  deletePost: undefined,
};

export default PostContent;
