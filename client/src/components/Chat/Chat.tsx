import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TProfileDefault } from '../../types/Profile';
import Back from '../../assets/back.svg';
import Pfp from '../../assets/pfp-two.svg';
import Send from '../../assets/send.svg';
import useAuthContext from '../../hooks/useAuthContext';
import TMessage from '../../types/Message';
import { sendMessage, getMessages } from '../../api/message';
import Message from './Message';
import Loading from '../Loading';
import useSocketContext from '../../hooks/useSocketContext';

type Props = {
  profile: TProfileDefault;
  close: () => void;
};

function Chat({ profile, close }: Props) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const auth = useAuthContext();
  const soc = useSocketContext();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const messagesQuery = useQuery<TMessage[], Error>({
    queryKey: ['chat', profile._id],
    queryFn: () => {
      return getMessages(profile._id);
    },
    onSuccess(data) {
      setMessages(data);
    },
  });

  const handleSend = useMutation({
    mutationFn: () => {
      if (message) {
        return sendMessage(profile._id, message);
      }
      return Promise.resolve(null);
    },
    onSuccess(successData) {
      if (successData) {
        setMessages([...messages, successData]);
        setMessage('');
      }
    },
  });

  function handleMessage(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  }

  useEffect(() => {
    soc.socket?.on('receiveMessage', (m: TMessage, sender: string) => {
      if (sender === profile._id) {
        setMessages((prevState) => {
          return [...prevState, m];
        });
      }
    });
  }, [soc, profile]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 550);
  }, [lastMessageRef]);

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
      <div className="grow flex flex-col p-3">
        {messages.map((m, i) => {
          const isMyMessage = m.sender === auth.user?._id;
          return (
            <div
              key={m._id}
              className={`flex flex-col ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
              ref={messages.length - 1 === i ? lastMessageRef : null}
            >
              <Message message={m} isMyMessage={isMyMessage} />
            </div>
          );
        })}
      </div>
      <div className="p-2 sticky bottom-0 bg-white">
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            handleSend.mutate();
          }}
          className="flex items-center"
        >
          <input
            type="text"
            autoComplete="off"
            className="bg-gray-200 p-2 rounded-full grow"
            onChange={handleMessage}
            value={message}
          />
          <button className="h-8 w-8" type="button">
            <Send
              height="100%"
              width="100%"
              fill={message ? 'rgb(96 165 250)' : 'rgb(209 213 219)'}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
