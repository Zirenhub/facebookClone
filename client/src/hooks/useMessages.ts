import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMessages, postMessage } from '../api/messages';
import { TMessage } from '../types/Message';
import useAuthContext from './useAuthContext';

function useMessages(query: 'private' | 'group', id: string) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const auth = useAuthContext();

  const {
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    data,
  } = useInfiniteQuery({
    queryKey: ['chat', id],
    queryFn: (context) => {
      return getMessages({
        pageParam: context.pageParam,
        id,
        query,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  function handleLoadPrevious() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const handleSend = useMutation({
    mutationFn: (message: string) => {
      if (message) {
        return postMessage(id, query, message);
      }
      throw new Error("Message can't be empty");
    },
  });

  useEffect(() => {
    if (status === 'success' && !isFetching && data) {
      const allMessages = data.pages.flatMap((page) => page.messages).reverse();
      setMessages(allMessages);
    }
  }, [data, isFetching, status]);

  useEffect(() => {
    function addMessage({ message }: { message: TMessage }) {
      setMessages((prevState) => {
        return [...prevState, message];
      });
    }

    auth.socket?.emit('joinGroup', id);
    auth.socket?.on('groupMessage', addMessage);

    return () => {
      auth.socket?.off('groupMessage', addMessage);
      auth.socket?.emit('leaveGroup', id);
    };
  }, [auth, id]);

  return {
    handleLoadPrevious,
    handleSend,
    messages,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    setMessages,
  };
}

export default useMessages;
