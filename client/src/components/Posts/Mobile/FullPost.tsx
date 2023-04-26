import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import Back from '../../../assets/back.svg';
import Search from '../../../assets/search.svg';
import PostHeader from './PostHeader';
import PostStyle from './PostStyle';
import PostFooter from './PostFooter';
import PostReactions from './PostReactions';
import FullPostComments from './FullPostComments';

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
    <div className="z-10 flex flex-col absolute bg-white h-full w-full top-0 left-0 p-2">
      <header className="flex items-center justify-between">
        <button type="button" onClick={close} className="w-8 h-8">
          <Back height="100%" width="100%" />
        </button>
        <p className="text-xl">{post.author.fullName}</p>
        <button type="button" className="w-8 h-8">
          <Search height="100%" width="100%" />
        </button>
      </header>
      <div className="flex flex-col mt-3 grow">
        <PostHeader post={post} mutationDeletePost={mutationDeletePost} />
        <PostStyle post={post} />
        <PostFooter
          isMobile
          post={post}
          mutationReactPost={mutationReactPost}
        />
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
