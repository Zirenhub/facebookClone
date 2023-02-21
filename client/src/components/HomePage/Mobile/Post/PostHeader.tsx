import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { UseMutationResult } from '@tanstack/react-query';
import { TDBPost } from '../../../../types/Post';
import Pfp from '../../../../assets/pfp-two.svg';

type Props = {
  post: TDBPost;
  deletePost?: UseMutationResult<any, unknown, string, unknown>;
};

function PostHeader({ post, deletePost }: Props) {
  const [postDate, setPostDate] = useState<string | null>(null);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);

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
        <div className="bg-white rounded-md border-2 px-3 py-2 absolute right-2 top-12 z-10 flex flex-col">
          <button
            type="button"
            onClick={(e: React.SyntheticEvent) => {
              e.stopPropagation();
              if (deletePost) deletePost.mutate(post._id);
            }}
            className="border-b-2"
          >
            Delete
          </button>
          <button type="button">Update</button>
        </div>
      )}
    </>
  );
}

PostHeader.defaultProps = {
  deletePost: undefined,
};

export default PostHeader;
