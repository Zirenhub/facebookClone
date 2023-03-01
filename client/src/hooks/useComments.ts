import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPostComments, postComment } from '../api/post';
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
    mutationFn: (comment: string) => {
      return postComment(postID, comment);
    },
    onSuccess(successData) {
      setComments([...comments, successData]);
    },
  });

  return { comments, mutateSendComment, isLoading, isError, error };
}

export default useComments;
