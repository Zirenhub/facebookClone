import Pfp from '../../../assets/pfp-two.svg';
import Back from '../../../assets/back.svg';
import Close from '../../../assets/x.svg';
import CreateDefaultPost from '../CreateDefaultPost';
import CreateImagePost from '../CreateImagePost';
import { TPost, TPostBackgrounds } from '../../../types/Post';
import useAuthContext from '../../../hooks/useAuthContext';

type Props = {
  post: TPost;
  close: () => void;
  canSendPost: boolean;
  handlePostProps: {
    submitPost: () => void;
    handlePostAudience: (e: React.SyntheticEvent) => void;
    setPostType: (type: 'image' | 'default') => void;
    handlePostBackground: (bg: TPostBackgrounds) => void;
    handlePostContent: (e: React.SyntheticEvent) => void;
    handleImageChange: (e: React.SyntheticEvent) => void;
  };
};

function CreatePostModal({ post, close, canSendPost, handlePostProps }: Props) {
  const auth = useAuthContext();

  return (
    <div className="z-10 absolute bg-white top-0 left-0 h-full w-full">
      <header className="flex justify-between p-3 border-b-2">
        <div className="flex gap-2 items-center">
          {post.type === 'image' ? (
            <button
              type="button"
              onClick={() => handlePostProps.setPostType('default')}
            >
              <Back />
            </button>
          ) : (
            <button type="button" onClick={close}>
              <Close />
            </button>
          )}
          <p className="font-bold">Create post</p>
        </div>
        <div>
          <button
            type="button"
            onClick={handlePostProps.submitPost}
            className={`${
              canSendPost
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            } font-bold rounded-sm px-2 py-1`}
          >
            POST
          </button>
        </div>
      </header>
      <div className="p-2">
        <div className="flex gap-2 mb-3">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p>{auth.user?.fullName}</p>
            <select
              value={post.audience}
              onChange={handlePostProps.handlePostAudience}
              className="bg-white font-bold border-2 rounded-md px-2 py-1"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          {post.type === 'default' && (
            <>
              <CreateDefaultPost
                post={post}
                handlePostBackground={handlePostProps.handlePostBackground}
                handlePostContent={handlePostProps.handlePostContent}
              />
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handlePostProps.setPostType('image')}
                  className="bg-gray-200 rounded-md px-2 py-1"
                >
                  Add image
                </button>
              </div>
            </>
          )}
          {post.type === 'image' && (
            <CreateImagePost
              post={post}
              handlePostContent={handlePostProps.handlePostContent}
              handleImageChange={handlePostProps.handleImageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
