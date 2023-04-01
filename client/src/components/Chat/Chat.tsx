import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TProfileDefault } from '../../types/Profile';
import Back from '../../assets/back.svg';
import Pfp from '../../assets/pfp-two.svg';
import useAuthContext from '../../hooks/useAuthContext';
import { TMessage } from '../../types/Message';
import { sendPrivateMessage, getPrivateMessages } from '../../api/messages';
import Loading from '../Loading';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';

type Props = {
  profile: TProfileDefault;
  close: () => void;
};

function Chat({ profile, close }: Props) {
  const [messages, setMessages] = useState<TMessage[]>([]);

  const auth = useAuthContext();

  const messagesQuery = useQuery<TMessage[], Error>({
    queryKey: ['chat', profile._id],
    queryFn: () => getPrivateMessages(profile._id),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setMessages(data);
    },
  });

  const handleSend = useMutation({
    mutationFn: (message: string) => {
      if (message) {
        return sendPrivateMessage(profile._id, message);
      }
      return Promise.reject(new Error("Message can't be empty"));
    },
    onSuccess(successData) {
      setMessages([...messages, successData]);
    },
  });

  useEffect(() => {
    function addNewMessage(m: TMessage, sender: string) {
      if (sender === profile._id) {
        setMessages((prevState) => {
          return [...prevState, m];
        });
      }
    }

    auth.socket?.on('receiveMessage', addNewMessage);

    return () => {
      auth.socket?.off('receiveMessage', addNewMessage);
    };
  }, [auth, profile]);

  if (messagesQuery.isLoading) {
    return <Loading />;
  }

  if (messagesQuery.isError) {
    return <p className="text-center">{messagesQuery.error.message}</p>;
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="sticky top-0 bg-white flex items-center gap-2 border-b-2 pb-2 shadow-sm pl-2 py-2">
        <button type="button" onClick={close} className="h-9 w-9">
          <Back height="100%" width="100%" fill="gray" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <p className="font-bold text-xl">{profile.fullName}</p>
        </div>
      </div>
      <ChatMessages messages={messages} userID={auth.user?._id} />
      <ChatFooter send={handleSend} />
    </div>
  );
}

export default Chat;
