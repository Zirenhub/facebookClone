import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { deletePost, postReact, removePostReact } from '../api/post';
import { ReactionTypes, TDBPost } from '../types/Post';
import useAuthContext from './useAuthContext';

function usePosts() {
  const [posts, setPosts] = useState<TDBPost[]>([]);

  const auth = useAuthContext();

  const mutationDeletePost = useMutation({
    mutationFn: (postID: string) => {
      return deletePost(postID);
    },
    onSuccess(successData, variables) {
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
    onSuccess(successData, variables) {
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

  return { mutationDeletePost, mutationReactPost, posts, setPosts };
}

export default usePosts;
