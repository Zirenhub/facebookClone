import XSvg from '../../../assets/x.svg';
import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import FullPostComments from '../Mobile/FullPostComments';
import PostFooter from '../Mobile/PostFooter';
import PostHeader from '../Mobile/PostHeader';
import PostReactions from '../Mobile/PostReactions';
import PostStyle from '../Mobile/PostStyle';

type Props = {
  post: ModifiedPost;
  close: () => void;
  mutationDeletePost?: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    deletePost: (postId: string) => void;
  };
  mutationReactPost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    reactPost: (postId: string, r: ReactionTypes | null) => void;
  };
};

function FullPost({
  post,
  close,
  mutationDeletePost,
  mutationReactPost,
}: Props) {
  return (
    <div className="z-40 bg-white rounded-lg relative overflow-scroll min-w-[40%] min-h-[60%] max-h-[80%] shadow-lg">
      <header className="flex items-center justify-between sticky top-0 bg-white z-30 p-3 shadow-lg w-full">
        <p className="text-xl ml-auto font-bold">
          {post.author.fullName}&apos;s Post
        </p>
        <button
          type="button"
          className="w-8 h-8 bg-gray-100 rounded-full p-2 ml-auto hover:bg-gray-200"
          onClick={close}
        >
          <XSvg height="100%" width="100%" fill="gray" />
        </button>
      </header>
      <div className="h-px mb-2 bg-gray-300" />
      <div className="px-4">
        <PostHeader post={post} mutationDeletePost={mutationDeletePost} />
        <PostStyle post={post} />
        <PostFooter post={post} mutationReactPost={mutationReactPost} />
        <PostReactions reactionsDetail={post.reactionsDetails} />
        <FullPostComments postID={post._id} />
      </div>
    </div>
  );
}

FullPost.defaultProps = {
  mutationDeletePost: undefined,
};

export default FullPost;
