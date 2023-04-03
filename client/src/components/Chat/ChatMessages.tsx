import moment from 'moment';
import { useEffect, useState } from 'react';
import { TMessage } from '../../types/Message';

type Props = {
  userID: string | undefined;
  messages: TMessage[];
  queryStatus: {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    isFetching: boolean;
    handleLoadPrevious: () => void;
  };
};

function ChatMessages({ userID, messages, queryStatus }: Props) {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    // only scroll down on initial chat open or if new message is sent
    if (
      messages.length > 0 &&
      lastMessage !== messages[messages.length - 1]._id
    ) {
      const chatMessagesElement = document.getElementById('chatMessages');
      const lastMessageElement = chatMessagesElement?.lastElementChild;
      lastMessageElement?.scrollIntoView({ behavior: 'smooth' });
      setLastMessage(messages[messages.length - 1]._id);
    }
  }, [messages, lastMessage]);

  return (
    <div className="grow flex flex-col p-3" id="chatMessages">
      {queryStatus.hasNextPage && (
        <button
          type="button"
          onClick={queryStatus.handleLoadPrevious}
          className="text-dimGray text-center"
        >
          Click to load previous messages...
        </button>
      )}
      <p className="text-dimGray">
        {queryStatus.isFetchingNextPage && 'Loading more...'}
        {!queryStatus.isFetchingNextPage &&
          !queryStatus.hasNextPage &&
          'Nothing more to load'}
      </p>
      {queryStatus.isFetching && !queryStatus.isFetchingNextPage && (
        <p className="text-dimGray">Fetching...</p>
      )}
      {messages.map((m) => {
        const ago = moment(m.createdAt).fromNow();
        const isMyMessage = m.sender._id === userID;

        return (
          <div
            key={m._id}
            className={`flex flex-col ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
          >
            <div
              className={`p-2 max-w-[280px] w-max flex flex-col justify-center rounded-lg text-white ${
                isMyMessage ? 'bg-blue-600 self-end' : 'bg-green-600'
              }`}
            >
              <p className="text-gray-300">{m.sender.fullName}</p>
              <p className={`${isMyMessage ? 'ml-auto' : 'mr-auto'}`}>
                {m.message}
              </p>
            </div>
            <p
              className={`text-dimGray w-fit ${
                isMyMessage ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {ago}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
