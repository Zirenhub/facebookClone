import { useEffect } from 'react';
import { TGroup } from '../../types/Group';
import Back from '../../assets/back.svg';
import useAuthContext from '../../hooks/useAuthContext';
import ChatFooter from '../../components/Chat/ChatFooter';
import { TMessage } from '../../types/Message';
import ChatMessages from '../../components/Chat/ChatMessages';
import stringShortener from '../../utils/stringShortener';
import Loading from '../../components/Loading';
import useMessages from '../../hooks/useMessages';

type Props = {
  group: TGroup;
  close: () => void;
};

function GroupChat({ group, close }: Props) {
  const auth = useAuthContext();

  const {
    handleLoadPrevious,
    handleSend,
    messages,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    setMessages,
  } = useMessages('group', group._id);

  useEffect(() => {
    function addMessage({ message }: { message: TMessage }) {
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
  }, [auth, group, setMessages]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full relative">
      <header className="p-3 bg-gray-100 shadow-md sticky top-0 flex items-center justify-between">
        <div className="flex flex-col">
          <button type="button" className="h-6 w-6" onClick={close}>
            <Back height="100%" width="100%" fill="gray" />
          </button>
          <p className="font-bold text-xl grow text-center">
            {stringShortener(group.name, 10, 10)}
          </p>
        </div>
        <button type="button" className="max-w-[150px] text-dimGray">
          View all {group.invited.length + 1} members
        </button>
      </header>
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
      <div />
    </div>
  );
}

export default GroupChat;
