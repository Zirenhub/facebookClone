import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import MobileWritePost from '../../components/HomePage/Mobile/WritePost';
import MobileAddStory from '../../components/HomePage/Mobile/AddStory';
import {
  deletePost,
  getPosts,
  postReact,
  removePostReact,
} from '../../api/post';
import { ReactionTypes, TDBPost } from '../../types/Post';
import SingularPost from '../../components/HomePage/Mobile/SingularPost';
import useAuthContext from '../../hooks/useAuthContext';

function HomePage() {
  const [posts, setPosts] = useState<TDBPost[]>([]);

  const auth = useAuthContext();

  const { isLoading, isError, data, error } = useQuery<TDBPost[], Error>({
    queryKey: ['posts', 'timeline'],
    queryFn: () => getPosts(),
    refetchOnWindowFocus: false,
  });

  const mutationDeletePost = useMutation({
    mutationFn: (postID: string) => {
      return deletePost(postID);
    },
    onSuccess(successData, variables, context) {
      setPosts(posts.filter((post) => post._id !== variables));
    },
  });

  const mutationReactPost = useMutation({
    mutationFn: ([postID, r]: [string, ReactionTypes | null]) => {
      if (r) {
        return postReact(postID, r);
      }
      return removePostReact(postID);
    },
    onSuccess(successData, variables, context) {
      const [postID, reaction] = variables;
      let updatedPosts;
      if (reaction && successData) {
        updatedPosts = posts.map((post) => {
          if (post._id === postID) {
            const myReaction = post.reactions.find(
              (r) => r.author === auth.user?._id
            );
            if (!myReaction) {
              return {
                ...post,
                reactions: [...post.reactions, successData],
              };
            }
            return {
              ...post,
              reactions: [
                ...post.reactions.map((r) => {
                  if (r.author === auth.user?._id) {
                    return { ...r, type: reaction };
                  }
                  return { ...r };
                }),
              ],
            };
          }
          return { ...post };
        });
      } else {
        updatedPosts = posts.map((p) => {
          if (p._id === postID) {
            const reactions = p.reactions.filter(
              (r) => r.author !== auth.user?._id
            );
            return { ...p, reactions };
          }
          return { ...p };
        });
      }
      setPosts(updatedPosts);
    },
  });

  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <MobileWritePost setPosts={setPosts} posts={posts} />
      <MobileAddStory />
      {posts
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        .map((post) => {
          let isAuthor = false;
          if (post.author._id === auth.user?._id) {
            isAuthor = true;
          }

          return (
            <div key={post._id} className="mt-2 border-b-4 border-slate-400">
              <SingularPost
                post={post}
                deletePost={isAuthor ? mutationDeletePost : undefined}
                reactPost={mutationReactPost}
              />
            </div>
          );
        })}
      {isError && <p>{error.message}</p>}
    </div>
  );
}

export default HomePage;
