import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { ModifiedPost } from '../../../types/Post';
import Pfp from '../../../assets/pfp-two.svg';
import stringShortener from '../../../utils/stringShortener';

type Props = {
  post: ModifiedPost;
  mutationDeletePost?: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    deletePost: (postId: string) => void;
  };
};

function PostHeader({ post, mutationDeletePost }: Props) {
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
    <div className="flex relative">
      <div
        onClick={navigateProfile}
        onKeyDown={navigateProfile}
        role="button"
        tabIndex={0}
        className="flex gap-3 grow"
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
          {post.audience === 'public' && (
            <p className="ml-auto text-dimGray">Public</p>
          )}
          {mutationDeletePost && (
            <button
              type="button"
              onClick={(e: React.SyntheticEvent) => {
                e.stopPropagation();
                setSettingsMenu(!settingsMenu);
              }}
              className="text-3xl h-fit"
            >
              &#8943;
            </button>
          )}
        </div>
      </div>

      {settingsMenu && (
        <div className="bg-white rounded-md border-2 px-3 py-2 absolute right-2 top-12 z-10 flex flex-col">
          <button
            type="button"
            onClick={(e: React.SyntheticEvent) => {
              e.stopPropagation();
              if (mutationDeletePost) mutationDeletePost.deletePost(post._id);
            }}
            className="border-b-2"
          >
            Delete
          </button>
          <button type="button">Update</button>
        </div>
      )}
    </div>
  );
}

PostHeader.defaultProps = {
  mutationDeletePost: undefined,
};

export default PostHeader;
