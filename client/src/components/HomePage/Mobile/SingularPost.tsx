import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import PostFooter from './Post/PostFooter';
import PostHeader from './Post/PostHeader';
import PostStyle from './Post/PostStyle';
import Back from '../../../assets/back.svg';
import Search from '../../../assets/search.svg';
import PostReactions from './Post/PostReactions';
import FooterPostComments from './Post/FooterPostComments';
import FullPostComments from './Post/FullPostComments';

type Props = {
  post: ModifiedPost;
  deletePost?: UseMutationResult<any, unknown, string, unknown>;
  reactPost: UseMutationResult<
    any,
    unknown,
    [string, ReactionTypes | null],
    unknown
  >;
};

function SingularPost({ post, deletePost, reactPost }: Props) {
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  if (openPost) {
    return (
      <div className="z-10 flex flex-col absolute bg-white h-full w-full top-0 left-0 p-2">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpenPost(false)}
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
          <PostHeader post={post} deletePost={deletePost} />
          <PostStyle post={post} />
          <PostFooter post={post} reactPost={reactPost} />
          <PostReactions reactionsDetail={post.reactionsDetails} />
          <FullPostComments postID={post._id} />
        </div>
      </div>
    );
  }

  function switchToFullPost(e: React.SyntheticEvent) {
    e.stopPropagation();
    setOpenPost(true);
  }

  return (
    <>
      <div
        onClick={switchToFullPost}
        onKeyDown={switchToFullPost}
        role="button"
        tabIndex={0}
        className="relative"
      >
        <PostHeader post={post} deletePost={deletePost} />
      </div>
      <PostStyle post={post} />
      <PostReactions reactionsDetail={post.reactionsDetails} />
      <PostFooter
        post={post}
        reactPost={reactPost}
        setCommentsOpen={() => setCommentsOpen(true)}
      />
      {commentsOpen && (
        <FooterPostComments post={post} close={() => setCommentsOpen(false)} />
      )}
    </>
  );
}

SingularPost.defaultProps = {
  deletePost: undefined,
};

export default SingularPost;
