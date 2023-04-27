import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ModifiedPost } from '../../types/Post';
import Pfp from '../../assets/pfp-two.svg';
import stringShortener from '../../utils/stringShortener';

type Props = {
  post: ModifiedPost;
  setOpenPost?: () => void;
  mutationDeletePost?: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    deletePost: (postId: string) => void;
  };
};

function PostHeader({ post, setOpenPost, mutationDeletePost }: Props) {
  const [postDate, setPostDate] = useState<string | null>(null);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  function navigateProfile(e: React.SyntheticEvent) {
    e.stopPropagation();
    navigate(`/${post.author._id}`);
  }

  function deletePost(e: React.SyntheticEvent) {
    e.stopPropagation();
    if (mutationDeletePost) mutationDeletePost.deletePost(post._id);
  }

  function handlePostMenu(e: React.SyntheticEvent) {
    e.stopPropagation();
    setSettingsMenu(!settingsMenu);
  }

  function switchToFullPost(e: React.SyntheticEvent) {
    e.stopPropagation();
    if (setOpenPost) {
      setOpenPost();
    }
  }

  useEffect(() => {
    setPostDate(moment(new Date(post.createdAt)).format('MMM Do, YYYY'));
  }, [post]);

  return (
    <div
      className="flex items-center justify-between"
      onKeyDown={navigateProfile}
      onClick={switchToFullPost}
      role="button"
      tabIndex={0}
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
        <div className="flex grow items-center justify-between gap-2">
          <div className="flex flex-col">
            <p className="font-bold">
              {stringShortener(post.author.fullName, 15)}
            </p>
            <p>{postDate}</p>
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-3 text-dimGray">
        {post.audience === 'public' && <p className="ml-auto">Public</p>}
        {mutationDeletePost && (
          <button
            type="button"
            onClick={handlePostMenu}
            className="text-3xl h-fit"
          >
            &#8943;
          </button>
        )}
        {settingsMenu && (
          <div className="bg-white rounded-md border-2 px-3 py-2 absolute right-2 top-10 z-10 flex flex-col">
            <button type="button" onClick={deletePost} className="border-b-2">
              Delete
            </button>
            <button type="button">Update</button>
          </div>
        )}
      </div>
    </div>
  );
}

PostHeader.defaultProps = {
  setOpenPost: undefined,
  mutationDeletePost: undefined,
};

export default PostHeader;
