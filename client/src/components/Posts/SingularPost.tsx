/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { ModifiedPost, ReactionTypes } from '../../types/Post';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostStyle from './PostStyle';
import PostReactions from './PostReactions';
import FooterPostComments from './Mobile/FooterPostComments';
import FullPostDesktop from './Desktop/FullPost';
import FullPostMobile from './Mobile/FullPost';

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

  return (
    <>
      {isOpen ? (
        isMobile ? (
          <FullPostMobile
            post={post}
            close={() => setIsOpen(false)}
            mutationDeletePost={mutationDeletePost}
            mutationReactPost={mutationReactPost}
          />
        ) : (
          <div className="absolute flex justify-center items-center top-0 left-0 z-30 h-full w-full bg-gray-200/50">
            <FullPostDesktop
              post={post}
              close={() => setIsOpen(false)}
              mutationDeletePost={mutationDeletePost}
              mutationReactPost={mutationReactPost}
            />
          </div>
        )
      ) : null}
      <PostHeader
        post={post}
        setOpenPost={isMobile ? () => setIsOpen(true) : undefined}
        mutationDeletePost={mutationDeletePost}
      />
      <PostStyle post={post} />
      <PostReactions reactionsDetail={post.reactionsDetails} />
      <PostFooter
        post={post}
        isMobile={isMobile}
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
