import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getPostComments,
  likeComment,
  postComment,
  replyToComment,
  unlikeComment,
} from '../api/post';
import { TComment, UpdatedComment } from '../types/Post';
import useAuthContext from './useAuthContext';

function useComments(postID: string) {
  const [comments, setComments] = useState<UpdatedComment[]>([]);
  const [replyingTo, setReplyingTo] = useState<UpdatedComment | null>(null);

  const auth = useAuthContext();

  const { isLoading, isError, error } = useQuery<TComment[], Error>({
    queryKey: ['comments', postID],
    queryFn: () => getPostComments(postID),
    onSuccess(successData) {
      const nestedComments = successData.filter((c) => c.parent);
      const sortedChildren = successData.map((p) => {
        const children = nestedComments.filter((c) => c.parent === p._id);
        return { ...p, children };
      });
      const removeChildren = sortedChildren.filter((c) => {
        return !c.parent;
      });
      setComments(removeChildren);
    },
  });

  const mutateReply = useMutation({
    mutationFn: (comment: string) => {
      if (replyingTo) {
        return replyToComment(postID, replyingTo._id, comment);
      }
      return postComment(postID, comment);
    },
    onSuccess(data) {
      if (data.parent) {
        const updatedComments = comments.map((c) => {
          if (c._id === data.parent) {
            return {
              ...c,
              children: [...c.children, { ...data, children: [] }],
            };
          }
          return { ...c };
        });
        setComments(updatedComments);
      } else {
        setComments([...comments, { ...data, children: [] }]);
      }
    },
  });

  const mutateLikeComment = useMutation({
    mutationFn: (commentID: string) => {
      return likeComment(commentID);
    },
    onSuccess(data, variables) {
      const updatedComments = comments.map((c) => {
        if (c._id === variables) {
          const updatedReactions = [...c.reactions, data];
          return { ...c, reactions: updatedReactions };
        }
        return { ...c };
      });

      setComments(updatedComments);
    },
  });

  const mutateUnlikeComment = useMutation({
    mutationFn: (commentID: string) => {
      return unlikeComment(commentID);
    },
    onSuccess(data, variables) {
      const updatedComments = comments.map((c) => {
        if (c._id === variables) {
          const updatedReactions = c.reactions.filter(
            (r) => r.author !== auth.user?._id
          );
          return { ...c, reactions: updatedReactions };
        }

        return { ...c };
      });

      setComments(updatedComments);
    },
  });

  return {
    comments,
    mutateReply,
    mutateLikeComment,
    mutateUnlikeComment,
    isLoading,
    isError,
    error,
    replyingTo,
    setReplyingTo,
  };
}

export default useComments;
