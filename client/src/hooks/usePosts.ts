import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  deletePost,
  getTimeline,
  postDefault,
  postImage,
  postReact,
  removePostReact,
} from '../api/post';
import createReactionDetails from '../utils/createReactionDetails';
import { ModifiedPost, ReactionTypes, TPost } from '../types/Post';
import useAuthContext from './useAuthContext';
import { getProfilePosts } from '../api/profile';

type Props = {
  postsType: 'timeline' | 'profile';
  id?: string;
  handleScroll: boolean;
};

function usePosts({ postsType, id, handleScroll }: Props) {
  const [queryProps, setQueryProps] = useState({
    queryFn: getTimeline,
    queryKey: 'timeline',
  });
  const [posts, setPosts] = useState<ModifiedPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuthContext();

  useEffect(() => {
    if (postsType === 'profile') {
      if (id) {
        setQueryProps({
          queryFn: ({ pageParam = 0 }) => getProfilePosts(id, pageParam),
          queryKey: id,
        });
      } else {
        setError('ID was not provided.');
      }
    }
  }, [postsType, id]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', queryProps.queryKey],
    queryFn: queryProps.queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === 'success' && !isFetching && data) {
      const allPosts = data.pages.flatMap((post) => post.posts);
      const modifiedPosts = allPosts.map((post) => {
        return createReactionDetails(post, auth.user?._id);
      });
      setPosts(modifiedPosts);
    }
  }, [data, isFetching, status, auth.user]);

  const mutationCreatePost = useMutation({
    mutationFn: ([post, postType]: [TPost, 'default' | 'image']) => {
      const { content, image, background, audience } = post;
      if (postType === 'image' && image) {
        return postImage(content, image, audience);
      }
      return postDefault(content, background, audience);
    },
    onSuccess(successData) {
      setPosts([...posts, createReactionDetails(successData)]);
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

  useEffect(() => {
    const container = document.body;
    function handleScrollFn() {
      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight;
      if (isAtBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
    if (handleScroll) {
      container.addEventListener('scroll', handleScrollFn);
    }
    return () => {
      container.removeEventListener('scroll', handleScrollFn);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, handleScroll]);

  return {
    mutationCreatePost: {
      isLoading: mutationCreatePost.isLoading,
      isError: mutationCreatePost.isError,
      error: mutationCreatePost.error,
      createPost: (post: TPost, postType: 'default' | 'image') =>
        mutationCreatePost.mutate([post, postType]),
    },
    mutationDeletePost: {
      isLoading: mutationDeletePost.isLoading,
      isError: mutationDeletePost.isError,
      error: mutationDeletePost.error,
      deletePost: (postId: string) => mutationDeletePost.mutate(postId),
    },
    mutationReactPost: {
      isLoading: mutationReactPost.isLoading,
      isError: mutationReactPost.isError,
      error: mutationReactPost.error,
      reactPost: (postId: string, r: ReactionTypes | null) =>
        mutationReactPost.mutate([postId, r]),
    },
    posts,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
    fetchNextPage,
  };
}

export default usePosts;
