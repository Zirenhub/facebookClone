import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TGroup } from '../../types/Group';
import Back from '../../assets/back.svg';
import useAuthContext from '../../hooks/useAuthContext';
import ChatFooter from '../../components/Chat/ChatFooter';
import { getGroupMessages, sendGroupMessage } from '../../api/messages';
import { TGroupMessage, TMessage } from '../../types/Message';
import ChatMessages from '../../components/Chat/ChatMessages';
import stringShortener from '../../utils/stringShortener';
import Loading from '../../components/Loading';

type Props = {
  group: TGroup;
  close: () => void;
};

function GroupChat({ group, close }: Props) {
  const [messages, setMessages] = useState<TGroupMessage[]>([]);

  const { isLoading, isError, error } = useQuery<TGroupMessage[], Error>({
    queryKey: ['chat', group._id],
    queryFn: () => getGroupMessages(group._id),
    refetchOnWindowFocus: false,
    onSuccess(successData) {
      console.log(successData);
      setMessages(successData);
    },
  });

  const auth = useAuthContext();

  const handleSend = useMutation({
    mutationFn: (message: string) => {
      if (message) {
        return sendGroupMessage(group._id, message);
      }
      return Promise.reject(new Error("Message can't be empty"));
    },
  });

  useEffect(() => {
    type SocketMessage = {
      message: TGroupMessage;
      sender: string;
    };

    function addMessage({ message, sender }: SocketMessage) {
      console.log(message);
      setMessages((prevState) => {
        return [...prevState, message];
      });
    }

    auth.socket?.emit('joinGroup', group._id);
    auth.socket?.on('groupMessage', addMessage);

    return () => {
      auth.socket?.off('groupMessage', addMessage);
      auth.socket?.emit('leaveGroup', group._id);
    };
  }, [auth, group]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p className="text-center">{error.message}</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-3 bg-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <button type="button" className="h-6 w-6" onClick={close}>
            <Back height="100%" width="100%" />
          </button>
          <p className="font-bold text-xl grow text-center">
            {stringShortener(group.name, 10, 10)}
          </p>
        </div>
        <button type="button" className="max-w-[150px] text-dimGray">
          View all {group.invited.length + 1} members members
        </button>
      </header>
      <ChatMessages messages={messages} userID={auth.user?._id} />
      <ChatFooter send={handleSend} />
      <div />
    </div>
  );
}

export default GroupChat;
