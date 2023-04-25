/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostStyle from './PostStyle';
import Back from '../../../assets/back.svg';
import Search from '../../../assets/search.svg';
import PostReactions from './PostReactions';
import FooterPostComments from './FooterPostComments';
import FullPostComments from './FullPostComments';

type Props = {
  post: ModifiedPost;
  isMobile: boolean;
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

function SingularPost({
  post,
  isMobile,
  mutationDeletePost,
  mutationReactPost,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  function mobileFullPost() {
    return (
      <div className="z-10 flex flex-col absolute bg-white h-full w-full top-0 left-0 p-2">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8"
          >
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
          <PostFooter post={post} mutationReactPost={mutationReactPost} />
          <PostReactions reactionsDetail={post.reactionsDetails} />
          <FullPostComments postID={post._id} />
        </div>
      </div>
    );
  }
  function desktopFullPost() {
    return (
      <div className="z-10 flex flex-col absolute bg-white top-2/4 left-2/4 p-2">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8"
          >
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
          <PostFooter post={post} mutationReactPost={mutationReactPost} />
          <PostReactions reactionsDetail={post.reactionsDetails} />
          <FullPostComments postID={post._id} />
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpen ? (isMobile ? mobileFullPost() : desktopFullPost()) : null}
      <PostHeader
        post={post}
        setOpenPost={isMobile ? () => setIsOpen(true) : undefined}
        mutationDeletePost={mutationDeletePost}
      />
      <PostStyle post={post} />
      <PostReactions reactionsDetail={post.reactionsDetails} />
      <PostFooter
        post={post}
        mutationReactPost={mutationReactPost}
        setCommentsOpen={
          isMobile ? () => setCommentsOpen(true) : () => setIsOpen(true)
        }
      />
      {commentsOpen && (
        <FooterPostComments post={post} close={() => setCommentsOpen(false)} />
      )}
    </>
  );
}

SingularPost.defaultProps = {
  mutationDeletePost: undefined,
};

export default SingularPost;
