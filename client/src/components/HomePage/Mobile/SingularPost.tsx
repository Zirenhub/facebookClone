import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { ReactionTypes, TDBPost } from '../../../types/Post';
import PostContent from './Post/PostContent';
import FullPost from './FullPost';
import PostFooter from './Post/PostFooter';

type Props = {
  post: TDBPost;
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

  if (openPost) {
    return <FullPost data={post} close={() => setOpenPost(false)} />;
  }

  return (
    <>
      <PostContent post={post} openPost={() => setOpenPost(true)} />
      <PostFooter
        postID={post._id}
        postReactions={post.reactions}
        reactPost={reactPost}
      />
    </>
  );
}

SingularPost.defaultProps = {
  deletePost: undefined,
};

export default SingularPost;
