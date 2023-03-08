import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import getReplies from '../api/comment';
import { getPostComments, postComment, replyToComment } from '../api/post';
import { NestedComment, TComment } from '../types/Post';
import addComment from '../utils/recurseNestedComments';

function useComments(postID: string) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [replyingTo, setReplyingTo] = useState<TComment | null>(null);

  const { isLoading, isError, error } = useQuery<TComment[], Error>({
    queryKey: ['comments', postID],
    queryFn: () => getPostComments(postID),
    onSuccess(successData) {
      setComments(successData);
    },
    refetchOnWindowFocus: false,
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
        const updatedComments = addComment(
          [data as NestedComment],
          [...comments]
        );
        setComments(updatedComments);
      } else {
        setComments([...comments, data]);
      }
    },
  });

  const mutateGetCommentReplies = useMutation({
    mutationFn: (commentID: string) => {
      return getReplies(commentID);
    },
    onSuccess(data) {
      const updatedComments = addComment(data, [...comments]);
      setComments(updatedComments);
    },
  });

  return {
    isLoading,
    isError,
    error,
    comments,
    mutateGetCommentReplies,
    setReplyingTo,
    replyingTo,
    mutateReply,
  };
}

export default useComments;
