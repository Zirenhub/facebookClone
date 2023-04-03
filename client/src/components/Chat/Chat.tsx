import { useEffect } from 'react';
import { TProfileDefault } from '../../types/Profile';
import Back from '../../assets/back.svg';
import Pfp from '../../assets/pfp-two.svg';
import useAuthContext from '../../hooks/useAuthContext';
import { TMessage } from '../../types/Message';
import Loading from '../Loading';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';
import useMessages from '../../hooks/useMessages';

type Props = {
  profile: TProfileDefault;
  close: () => void;
};

function Chat({ profile, close }: Props) {
  const auth = useAuthContext();

  const {
    handleLoadPrevious,
    messages,
    handleSend,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    setMessages,
  } = useMessages('private', profile._id);

  useEffect(() => {
    function addNewMessage({ message }: { message: TMessage }) {
      setMessages((prevState) => {
        return [...prevState, message];
      });
    }
    const privateRoom = [auth.user?._id, profile._id].sort().join('_');

    auth.socket?.emit('joinChat', privateRoom);
    auth.socket?.on('receiveMessage', addNewMessage);

    return () => {
      auth.socket?.off('receiveMessage', addNewMessage);
      auth.socket?.emit('leaveChat', privateRoom);
    };
  }, [auth, profile, setMessages]);

  if (status === 'loading') {
    return <Loading />;
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
      {status === 'error' && error instanceof Error && <p>{error.message}</p>}
      <ChatMessages
        messages={messages}
        userID={auth.user?._id}
        queryStatus={{
          hasNextPage,
          isFetchingNextPage,
          isFetching,
          handleLoadPrevious,
        }}
      />
      <ChatFooter send={handleSend} />
    </div>
  );
}

export default Chat;
