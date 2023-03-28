import { useEffect, useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import useAuthContext from '../../../hooks/useAuthContext';
import Pfp from '../../../assets/pfp-two.svg';
import Back from '../../../assets/back.svg';
import Close from '../../../assets/x.svg';
import CreateDefaultPost from './CreatePostTypes/CreateDefaultPost';
import CreateImagePost from './CreatePostTypes/CreateImagePost';
import { TDBPost, TPost } from '../../../types/Post';
import Loading from '../../Loading';

type Props = {
  mutationCreatePost: UseMutationResult<
    TDBPost,
    unknown,
    [TPost, 'default' | 'image'],
    unknown
  >;
  close: () => void;
};

function CreatePost({ mutationCreatePost, close }: Props) {
  const [postType, setPostType] = useState<'default' | 'image'>('default');
  const [post, setPost] = useState<TPost>({
    content: '',
    background: null,
    image: null,
    audience: 'friends',
  });
  const [canSendPost, setCanSendPost] = useState<boolean>(false);

  const auth = useAuthContext();

  function handlePostAudience(e: React.SyntheticEvent) {
    const target = e.target as HTMLSelectElement;
    if (target.value === 'friends' || target.value === 'public') {
      setPost({ ...post, audience: target.value });
    }
  }

  useEffect(() => {
    const { image } = post;
    const content = post.content.trim();

    if (postType === 'image') {
      if (content && image) {
        setCanSendPost(true);
        return;
      }
      setCanSendPost(false);
    } else {
      if (content) {
        setCanSendPost(true);
        return;
      }
      setCanSendPost(false);
    }
  }, [post, postType]);

  if (mutationCreatePost.isLoading) {
    return <Loading />;
  }

  return (
    <div className="z-10 absolute bg-white top-0 left-0 h-full w-full">
      <header className="flex justify-between p-3 border-b-2">
        <div className="flex gap-2 items-center">
          {postType === 'image' ? (
            <button type="button" onClick={() => setPostType('default')}>
              <Back />
            </button>
          ) : (
            <button type="button" onClick={close}>
              <Close />
            </button>
          )}
          <p className="font-bold">Create post</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (canSendPost) {
                mutationCreatePost.mutate([post, postType]);
                close();
              }
            }}
            className={`${
              canSendPost
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            } font-bold rounded-sm px-2 py-1`}
          >
            POST
          </button>
        </div>
      </header>
      <div className="p-2">
        <div className="flex gap-2 mb-3">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p>{auth.user?.fullName}</p>
            <select
              value={post.audience}
              onChange={handlePostAudience}
              className="bg-white font-bold border-2 rounded-md px-2 py-1"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          {postType === 'default' && (
            <>
              <CreateDefaultPost post={post} setPost={setPost} />
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPostType('image');
                    setCanSendPost(false);
                  }}
                  className="bg-gray-200 rounded-md px-2 py-1"
                >
                  Add image
                </button>
              </div>
            </>
          )}
          {postType === 'image' && (
            <CreateImagePost post={post} setPost={setPost} />
          )}
          {mutationCreatePost.isError && (
            <p className="text-center mt-5 border-t-2 text-xl font-bold">
              {mutationCreatePost.error instanceof Error &&
                mutationCreatePost.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
