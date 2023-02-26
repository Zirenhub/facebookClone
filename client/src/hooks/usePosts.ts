import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { deletePost, postReact, removePostReact } from '../api/post';
import createReactionDetails from '../utils/createReactionDetails';
import { ModifiedPost, ReactionTypes, TDBPost } from '../types/Post';
import useAuthContext from './useAuthContext';

function usePosts(rawPosts?: TDBPost[]) {
  const [posts, setPosts] = useState<ModifiedPost[]>([]);

  const auth = useAuthContext();

  useEffect(() => {
    if (rawPosts) {
      setPosts(
        rawPosts.map((post) => {
          return createReactionDetails(post, auth.user?._id);
        })
      );
    }
  }, [rawPosts, auth.user]);

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
      let updatedPosts = [...posts];
      // if there is a reaction and success data then we either updated or created a reaction,
      // else we removed a reaction
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
                reactionsDetails: {
                  ...post.reactionsDetails,
                  [reaction]: post.reactionsDetails[reaction] + 1,
                  reactionsNum: post.reactionsDetails.reactionsNum + 1,
                  myReaction: reaction,
                },
              };
            }
            return {
              ...post,
              reactions: [
                ...post.reactions.map((r) => {
                  if (r.author === auth.user?._id) {
                    return { ...successData };
                  }
                  return { ...r };
                }),
              ],
              reactionsDetails: {
                ...post.reactionsDetails,
                [myReaction.type]: post.reactionsDetails[myReaction.type] - 1,
                [successData.type]: post.reactionsDetails[successData.type] + 1,
                myReaction: reaction,
              },
            };
          }
          return { ...post };
        });
      } else {
        updatedPosts = posts.map((p) => {
          if (p._id === postID) {
            const myReaction = p.reactions.find(
              (r) => r.author === auth.user?._id
            );
            if (myReaction) {
              const reactions = p.reactions.filter(
                (r) => r.author !== auth.user?._id
              );
              return {
                ...p,
                reactions,
                reactionsDetails: {
                  ...p.reactionsDetails,
                  [myReaction.type]: p.reactionsDetails[myReaction.type] - 1,
                  reactionsNum: p.reactionsDetails.reactionsNum - 1,
                  myReaction: null,
                },
              };
            }
            return { ...p };
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
