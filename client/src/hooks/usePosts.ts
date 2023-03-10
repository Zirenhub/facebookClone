import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  deletePost,
  postDefault,
  postImage,
  postReact,
  removePostReact,
} from '../api/post';
import createReactionDetails from '../utils/createReactionDetails';
import { ModifiedPost, ReactionTypes, TDBPost, TPost } from '../types/Post';
import useAuthContext from './useAuthContext';

function usePosts() {
  const [initialPosts, setInitialPosts] = useState<TDBPost[]>([]);
  const [posts, setPosts] = useState<ModifiedPost[]>([]);

  const auth = useAuthContext();

  useEffect(() => {
    const modifiedPosts = initialPosts.map((post) => {
      return createReactionDetails(post, auth.user?._id);
    });
    setPosts(modifiedPosts);
  }, [initialPosts, auth]);

  const mutationCreatePost = useMutation({
    mutationFn: ([post, postType]: [TPost, 'default' | 'image']) => {
      const { content, image, background, audience } = post;
      if (postType === 'image' && image) {
        return postImage(content, image, audience);
      }
      return postDefault(content, background, audience);
    },
    onSuccess(data, variables, context) {
      setPosts([...posts, createReactionDetails(data)]);
    },
  });

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
                ...(myReaction.type !== successData.type && {
                  [successData.type]:
                    post.reactionsDetails[successData.type] + 1,
                  [myReaction.type]: post.reactionsDetails[myReaction.type] - 1,
                }),
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

  return {
    mutationCreatePost,
    mutationDeletePost,
    mutationReactPost,
    posts,
    setInitialPosts,
  };
}

export default usePosts;
