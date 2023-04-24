import { TGroup } from '../../types/Group';
import Back from '../../assets/back.svg';
import useAuthContext from '../../hooks/useAuthContext';
import ChatFooter from '../Chat/ChatFooter';
import ChatMessages from '../Chat/ChatMessages';
import stringShortener from '../../utils/stringShortener';
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
  } = useMessages('group', group._id);

  return (
    <div className="flex flex-col h-full relative">
      <header className="p-3 bg-gray-200 rounded-lg shadow-sm border-2 sticky top-0 w-full flex items-center justify-between">
        <div className="flex flex-col">
          <button type="button" className="h-6 w-6" onClick={close}>
            <Back height="100%" width="100%" fill="gray" />
          </button>
          <p className="font-bold text-xl grow text-center">
            {stringShortener(group.name, 10)}
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
