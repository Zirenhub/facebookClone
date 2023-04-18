import { useState } from 'react';
import Pfp from '../../../assets/pfp-two.svg';
import Pictures from '../../../assets/pictures.svg';
import CreatePostModal from '../../HomePage/CreatePost';
import SingularPost from '../../HomePage/Mobile/SingularPost';
import { ModifiedPost, ReactionTypes, TPost } from '../../../types/Post';

type Props = {
  posts: ModifiedPost[];
  mutationCreatePost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    createPost: (post: TPost, postType: 'default' | 'image') => void;
  };
  mutationReactPost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    reactPost: (postId: string, r: ReactionTypes | null) => void;
  };
  mutationDeletePost: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    deletePost: (postId: string) => void;
  };
};

function OwnProfilePosts({
  posts,
  mutationCreatePost,
  mutationReactPost,
  mutationDeletePost,
}: Props) {
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  if (openCreatePost) {
    return (
      <CreatePostModal
        close={() => setOpenCreatePost(false)}
        mutationCreatePost={mutationCreatePost}
      />
    );
  }

  return (
    <div className="p-2">
      <div className="flex flex-col border-b-4">
        <p className="font-bold">Details</p>
        <p className="text-dimGray">No details avalible</p>
        <div className="flex flex-col gap-2 pt-2 pb-2">
          <button type="button" className="self-start">
            ... See your About Info
          </button>
          <button
            type="button"
            className="bg-blue-100 text-blue-500 rounded-md py-1"
          >
            Edit public details
          </button>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Friends</p>
          <button type="button" className="text-blue-500">
            Find Friends
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">Posts</p>
        <div className="flex gap-2">
          <div className="h-10 w-10">
            <Pfp height="100%" width="100%" />
          </div>
          <button
            type="button"
            className="rounded-full p-2 border-2 grow"
            onClick={() => setOpenCreatePost(true)}
          >
            What&apos;s on your mind?
          </button>
          <div className="h-10 w-10">
            <Pictures height="100%" width="100%" />
          </div>
        </div>
      </div>
      {posts
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        .map((post) => {
          return (
            <div key={post._id} className="mt-2 border-b-4 border-slate-400">
              <SingularPost
                post={post}
                mutationDeletePost={mutationDeletePost}
                mutationReactPost={mutationReactPost}
              />
            </div>
          );
        })}
    </div>
  );
}

export default OwnProfilePosts;
