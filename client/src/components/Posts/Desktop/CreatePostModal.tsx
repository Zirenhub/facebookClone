import Pfp from '../../../assets/pfp-two.svg';
import useAuthContext from '../../../hooks/useAuthContext';
import { TPost, TPostBackgrounds } from '../../../types/Post';
import CreateDefaultPost from '../CreateDefaultPost';
import CreateImagePost from '../CreateImagePost';
import Image from '../../../assets/pictures.svg';

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
    handleRemoveImage: () => void;
  };
};

function CreatePostModal({ post, close, canSendPost, handlePostProps }: Props) {
  const {
    handlePostBackground,
    handlePostContent,
    handleImageChange,
    handleRemoveImage,
    setPostType,
  } = handlePostProps;

  const auth = useAuthContext();

  function changePostType() {
    if (post.type === 'default') {
      setPostType('image');
    } else {
      setPostType('default');
    }
  }

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-200/70 z-30 flex justify-center items-center">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg gap-3 min-w-[500px]">
        <div className="flex border-b">
          <p className="ml-auto text-2xl font-bold">Create post</p>
          <button
            type="button"
            onClick={close}
            className="ml-auto text-xl text-dimGray"
          >
            &#10006;
          </button>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col pl-3">
            <p>{auth.user?.fullName}</p>
            <select
              className="rounded-lg px-2 py-1"
              value={post.audience}
              onChange={handlePostProps.handlePostAudience}
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>
        {post.type === 'default' ? (
          <CreateDefaultPost
            post={post}
            handlePostBackground={handlePostBackground}
            handlePostContent={handlePostContent}
          />
        ) : (
          <CreateImagePost
            post={post}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            handlePostContent={handlePostContent}
          />
        )}
        <div className="font-bold flex justify-between items-center border rounded-md py-2 text-start px-4">
          <p>Add to your post</p>
          <button
            type="button"
            className="h-auto w-8 relative"
            onClick={changePostType}
          >
            <Image height="100%" width="100%" fill="rgb(34, 197, 94)" />
            {post.type === 'image' && (
              <span className="text-red-500 absolute -top-2 right-0">
                &#10006;
              </span>
            )}
          </button>
        </div>
        <button
          type="button"
          disabled={!canSendPost}
          onClick={() => handlePostProps.submitPost}
          className={`font-bold ${
            canSendPost ? 'bg-blue-500 text-white' : 'bg-gray-200 text-dimGray'
          } rounded-md py-2`}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePostModal;
