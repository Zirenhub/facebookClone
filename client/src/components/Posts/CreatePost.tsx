import React, { Suspense, useEffect, useState } from 'react';
import { TPost, TPostBackgrounds } from '../../types/Post';
import Loading from '../Loading';

const CreatePostModalMobile = React.lazy(
  () => import('./Mobile/CreatePostModal')
);
const CreatePostModalDesktop = React.lazy(
  () => import('./Desktop/CreatePostModal')
);

type Props = {
  mutationCreatePost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    createPost: (post: TPost) => void;
  };
  close: () => void;
  isMobile: boolean;
};

function CreatePost({ mutationCreatePost, close, isMobile }: Props) {
  const [post, setPost] = useState<TPost>({
    content: '',
    background: null,
    image: null,
    audience: 'friends',
    type: 'default',
    maxLength: 450,
  });
  const [canSendPost, setCanSendPost] = useState<boolean>(false);

  const handlePostAudience = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;
    if (target.value === 'friends' || target.value === 'public') {
      setPost({ ...post, audience: target.value });
    }
  };

  const handlePostBackground = (bg: TPostBackgrounds) => {
    if (post.content.length <= 250) {
      setPost({ ...post, background: bg });
    }
  };

  const handlePostContent = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const content = target.value;
    if (post.type === 'default' && content.length > 250 && post.background) {
      setPost({
        ...post,
        content,
        background: null,
      });
    } else {
      setPost({ ...post, content });
    }
  };

  const handleImageChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setPost({ ...post, image: target.files[0] });
    }
  };

  const submitPost = () => {
    if (canSendPost) {
      mutationCreatePost.createPost(post);
      close();
    }
  };

  useEffect(() => {
    const { image, type, content } = post;
    const trimedContent = content.trim();

    if (type === 'image') {
      if (trimedContent && image) {
        setCanSendPost(true);
      } else {
        setCanSendPost(false);
      }
    } else if (trimedContent) {
      setCanSendPost(true);
    } else {
      setCanSendPost(false);
    }
  }, [post]);

  if (mutationCreatePost.isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {isMobile ? (
        <CreatePostModalMobile
          post={post}
          close={close}
          canSendPost={canSendPost}
          handlePostProps={{
            submitPost,
            handlePostAudience,
            setPostType: (type: 'image' | 'default') =>
              setPost({ ...post, type }),
            handlePostBackground,
            handlePostContent,
            handleImageChange,
          }}
        />
      ) : (
        <CreatePostModalDesktop
          post={post}
          close={close}
          canSendPost={canSendPost}
          handlePostProps={{
            submitPost,
            handlePostAudience,
            setPostType: (type: 'image' | 'default') =>
              setPost({ ...post, type }),
            handlePostBackground,
            handlePostContent,
            handleImageChange,
          }}
        />
      )}
      {mutationCreatePost.isError && (
        <p className="text-center mt-5 border-t-2 text-xl font-bold">
          {mutationCreatePost.error instanceof Error &&
            mutationCreatePost.error.message}
        </p>
      )}
    </Suspense>
  );
}

export default CreatePost;
