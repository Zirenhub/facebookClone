import Pfp from '../../../assets/pfp-two.svg';
import useAuthContext from '../../../hooks/useAuthContext';
import { TPost, TPostBackgrounds } from '../../../types/Post';
import CreateDefaultPost from '../CreateDefaultPost';

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
        <CreateDefaultPost
          post={post}
          handlePostBackground={handlePostProps.handlePostBackground}
          handlePostContent={handlePostProps.handlePostContent}
        />
        <button
          type="button"
          className="font-bold border rounded-md py-2 text-start px-4"
        >
          Add to your post
        </button>
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
