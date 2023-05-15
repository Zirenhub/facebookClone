import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
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

  const getRoomID = useCallback(() => {
    return query === 'group' ? id : [auth.user?._id, id].sort().join('_');
  }, [auth.user, id, query]);

  function handleLoadPrevious() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const handleSend = useMutation({
    mutationFn: (message: string) => {
      if (message) {
        return postMessage(id, query, message, getRoomID());
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
    const roomID = getRoomID();
    const socketProps = {
      roomID,
      emit: query === 'group' ? 'joinGroup' : 'joinChat',
      on: 'receiveMessage',
      leave: query === 'group' ? 'leaveGroup' : 'leaveChat',
    };
    function addMessage({
      message,
      msgRoomID,
    }: {
      message: TMessage;
      msgRoomID: string;
    }) {
      if (msgRoomID === roomID) {
        setMessages((prevState) => {
          return [...prevState, message];
        });
      }
    }
    auth.socket?.emit(socketProps.emit, socketProps.roomID);
    auth.socket?.on(socketProps.on, addMessage);

    return () => {
      auth.socket?.off(socketProps.on, addMessage);
      auth.socket?.emit(socketProps.leave, socketProps.roomID);
    };
  }, [auth, id, query, getRoomID]);

  return {
    handleLoadPrevious,
    handleSend: {
      send: (message: string) => {
        handleSend.mutate(message);
      },
      error: handleSend.error,
      loading: handleSend.isLoading,
    },
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
