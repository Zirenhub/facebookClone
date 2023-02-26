import { useState } from 'react';
import Pfp from '../../../assets/pfp-two.svg';
import Pictures from '../../../assets/pictures.svg';
import { ModifiedPost } from '../../../types/Post';
import CreatePostModal from './CreatePost';

type Props = {
  setPosts: React.Dispatch<React.SetStateAction<ModifiedPost[]>>;
  posts: ModifiedPost[];
};

function WritePost({ setPosts, posts }: Props) {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  if (openCreatePost) {
    return (
      <CreatePostModal
        close={() => setOpenCreatePost(false)}
        setPosts={setPosts}
        posts={posts}
      />
    );
  }

  return (
    <div className="flex items-center pb-2">
      <div className="w-12 rounded-full bg-gray-200">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="grow px-3">
        <button
          type="button"
          className="px-5 py-2 min-w-full rounded-full border-2 border-gray-300 text-start"
          onClick={() => setOpenCreatePost(true)}
        >
          What&apos;s on your mind?
        </button>
      </div>
      <div className="w-12">
        <Pictures width="100%" height="100%" fill="gray" />
      </div>
    </div>
  );
}

export default WritePost;
