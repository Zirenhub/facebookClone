import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPostComments, likeComment, postComment } from '../api/post';
import { TComment } from '../types/Post';

function useComments(postID: string) {
  const [comments, setComments] = useState<TComment[]>([]);

  const { isLoading, isError, error } = useQuery<TComment[], Error>({
    queryKey: ['comments', postID],
    queryFn: () => getPostComments(postID),
    onSuccess(successData) {
      setComments(successData);
    },
  });

  const mutateSendComment = useMutation({
    mutationFn: (commentID: string) => {
      return postComment(postID, commentID);
    },
    onSuccess(successData) {
      setComments([...comments, successData]);
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

  return {
    comments,
    mutateSendComment,
    mutateLikeComment,
    isLoading,
    isError,
    error,
  };
}

export default useComments;
