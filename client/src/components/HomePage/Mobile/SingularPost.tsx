import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { ReactionTypes, TDBPost } from '../../../types/Post';
import PostFooter from './Post/PostFooter';
import PostHeader from './Post/PostHeader';
import PostStyle from './Post/PostStyle';
import Back from '../../../assets/back.svg';
import Search from '../../../assets/search.svg';

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
    return (
      <div className="z-10 absolute bg-white h-full w-full top-0 left-0 p-2">
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
        <div className="flex flex-col mt-3">
          <div className="flex justify-between">
            <PostHeader post={post} deletePost={deletePost} />
          </div>
          <PostStyle post={post} />
          <PostFooter
            postID={post._id}
            postReactions={post.reactions}
            reactPost={reactPost}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => setOpenPost(true)}
        onKeyDown={() => setOpenPost(true)}
        role="button"
        tabIndex={0}
        className="flex justify-between relative"
      >
        <PostHeader post={post} deletePost={deletePost} />
      </div>
      <PostStyle post={post} />
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
